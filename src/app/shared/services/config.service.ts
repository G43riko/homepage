import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { shareReplay, tap } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class ConfigService<T> {
    public constructor(private readonly httpClient: HttpClient) {
    }

    private _config: T;

    private readonly config$ = this.httpClient.get<T>("./assets/config.json", {observe: "body"}).pipe(
        tap((config) => this._config = config),
        shareReplay(1),
    );

    public get config(): T {
        return this._config;
    }

    public init(): Promise<T> {
        return this.config$.toPromise();
    }

    public get<S extends keyof T>(key: S): T[S] {
        return this._config[key];
    }
}

