import { Injectable } from "@angular/core";
import { from, Observable, of, ReplaySubject, Subject } from "rxjs";
import { last, switchMap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ScriptsLoadResponse } from "../models/scriptsLoadResponse.model";

export const ScriptStore: any = {
    semantic: "assets/semantic.min.js",
    jquery: "assets/jquery-3.2.1.js",
};

export const StylesStore: any = {
    semantic: "assets/semantic.min.css",
};

@Injectable()
export class ScriptService {
    private readonly _scriptsQueue: { scriptName: string, loadScriptMethod: ReplaySubject<ScriptsLoadResponse> }[] = [];

    public constructor() {
        const emptyReplaySubject: ReplaySubject<ScriptsLoadResponse> = new ReplaySubject(1);
        emptyReplaySubject.next({script: "", loaded: true, status: "Empty"});

        this._scriptsQueue.push({scriptName: "", loadScriptMethod: emptyReplaySubject});
    }

    private static _assert(condition: boolean, message?: string): void {
        if (!environment.production) {
            console.assert(condition, message);
        }
    }

    public loadStyles(name: string): Observable<ScriptsLoadResponse> {
        ScriptService._assert(Object.values(StylesStore).includes(name),
            `${name} is assumed to be a script in the ScriptStore`);

        return Observable.create((subject: Subject<ScriptsLoadResponse>) => {
            const linkStyles: HTMLLinkElement = document.createElement("link") as HTMLLinkElement;
            linkStyles.rel = "stylesheet";
            linkStyles.type = "text/css";
            linkStyles.media = "all";
            linkStyles.href = name;

            // Load the css link
            const existentLink = window.document.querySelector(`link[href="${name}"]`);
            if (existentLink) {
                subject.next(new ScriptsLoadResponse({name, status: "Multiple"}));
                subject.complete();
            } else {
                document.getElementsByTagName("head")[0].appendChild(linkStyles);
            }

            linkStyles.onload = () => {
                subject.next(new ScriptsLoadResponse({name, status: "Loaded"}));
                subject.complete();
            };

            linkStyles.onerror = (error: any) => {
                subject.next(new ScriptsLoadResponse({name, loaded: false, status: error}));
                subject.complete();
            };
        });
    }

    public loadScripts(names: string[]): Observable<ScriptsLoadResponse> {
        return from(names).pipe(
            // for every script calls loadScript method
            switchMap((scriptName) => this.loadScript(scriptName)),
            // returns the last loadScript method as an observable
            last(),
        );
    }

    private loadScript(name: string): Observable<ScriptsLoadResponse> {
        ScriptService._assert(Object.values(ScriptStore).includes(name),
            `${name} is assumed to be a script in the ScriptStore`);

        // checks, if the script already exists in the scriptsQueue
        if (this._scriptsQueue.some((loading) => loading.scriptName === name)) {
            // if it exists, return its load subject as an observable

            const item = this._scriptsQueue.find((loading) => loading.scriptName === name);
            return item ? item.loadScriptMethod.asObservable() : of(new ScriptsLoadResponse({}));
        }

        // create a load subject for the current script
        const scriptLoadSubject = new ReplaySubject<ScriptsLoadResponse>(1);

        from(this._scriptsQueue).pipe(
            // subscribe on the last script in the scripts queue
            last(),
            switchMap((lastScript) => {
                // add the script name <-> load subject pair to the scripts queue
                this._scriptsQueue.push({scriptName: name, loadScriptMethod: scriptLoadSubject});

                // onLoad of the last script subscribe with loading of the current script
                return lastScript.loadScriptMethod;
            }),
        ).subscribe((scriptLoadResponse) => {
            // previous script hasn't loaded
            if (!scriptLoadResponse.loaded) {
                console.log(`the script ${scriptLoadResponse.script} failed to load`);
            }

            // create the script element
            const script: HTMLScriptElement = document.createElement("script") as HTMLScriptElement;
            script.type = "text/javascript";
            script.src = name;

            // Load the script
            const existentScript = window.document.querySelector(`script[src="${name}"]`);
            if (existentScript) {
                scriptLoadSubject.next({script: name, loaded: true, status: "Multiple"});
                scriptLoadSubject.complete();
            } else {
                document.getElementsByTagName("head")[0].appendChild(script);
            }

            script.onload = () => {
                scriptLoadSubject.next({script: name, loaded: true, status: "Loaded"});
                scriptLoadSubject.complete();
            };

            script.onerror = (error: any) => {
                scriptLoadSubject.next({script: name, loaded: false, status: error});
                scriptLoadSubject.complete();
            };
        });

        // return the load subject as an observable
        return scriptLoadSubject.asObservable();
    }
}
