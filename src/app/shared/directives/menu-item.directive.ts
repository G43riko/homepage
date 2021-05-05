import {Directive, Input, OnDestroy, OnInit, TemplateRef} from "@angular/core";
import {MenuService} from "../services/menu.service";

@Directive({
    selector: "[menuItem]"
})
export class MenuItemDirective implements OnInit, OnDestroy {
    @Input("menuItem")
    public readonly direction?: "end" | "start";

    public constructor(public readonly template: TemplateRef<unknown>,
                       public readonly menuService: MenuService) {
    }

    public ngOnInit(): void {
        this.menuService.addTemplate(this.template, this.direction);
    }

    public ngOnDestroy(): void {
        this.menuService.removeTemplate(this.template, this.direction);
    }
}
