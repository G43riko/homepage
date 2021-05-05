import {Injectable, TemplateRef} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class MenuService {
    public readonly startTemplates$ = new BehaviorSubject<TemplateRef<unknown>[]>([]);
    public readonly endTemplates$ = new BehaviorSubject<TemplateRef<unknown>[]>([]);


    public addTemplate(template: TemplateRef<unknown>, direction?: "end" | "start"): void {
        if (direction === "end") {
            this.endTemplates$.value.push(template);
        } else {
            this.startTemplates$.value.push(template);
        }
    }

    public removeTemplate(template: TemplateRef<unknown>, direction?: "end" | "start"): void {
        const array = direction === "end" ? this.endTemplates$.value : this.startTemplates$.value;
        const index = array.indexOf(template);

        if (index >= 0) {
            array.splice(index, 1);
        }

    }
}
