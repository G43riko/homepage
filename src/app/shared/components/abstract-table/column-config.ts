import { TemplateRef } from "@angular/core";
import { Observable } from "rxjs";

export interface ColumnConfig<T, S extends keyof T = keyof T> {
    name: S;
    width?: string;
    sort?: boolean;
    label?: string;
    label$?: Observable<string>;
    visible?: boolean;
    nowrap?: boolean;
    customLabel?: (row: T) => string;
    customContent?: (row: T) => string;
    template?: TemplateRef<any>;
}
