import { TemplateRef } from "@angular/core";
import { Observable } from "rxjs";

export interface ColumnConfig {
    name: string;
    width?: string;
    sort?: boolean;
    label?: string;
    label$?: Observable<string>;
    visible?: boolean;
    customLabel?: (row: any) => string;
    customContent?: (row: any) => string;
    template?: TemplateRef<any>;
}
