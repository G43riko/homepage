import {TemplateRef} from "@angular/core";

export interface ColumnConfig {
    name: string;
    width?: string;
    sort?: boolean;
    label?: string;
    visible?: boolean;
    customLabel?: (row: any) => string;
    customContent?: (row: any) => string;
    template?: TemplateRef<any>;
}
