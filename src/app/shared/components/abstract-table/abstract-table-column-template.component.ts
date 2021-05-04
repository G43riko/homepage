import {Directive, Input, TemplateRef} from "@angular/core";

@Directive({
    selector: "[tableColumn]",
})
export class AbstractTableColumnTemplateComponent {
    @Input("tableColumn")
    public readonly name: string;

    public constructor(public readonly template: TemplateRef<unknown>) {
    }
}
