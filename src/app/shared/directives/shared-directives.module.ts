import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DropZoneDirective} from "./drop-zone.directive";
import {ExternalLinkDirective} from "./external-link.directive";
import {ShowAbleDirective} from "./showable.directive";
import {MenuItemDirective} from "./menu-item.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ExternalLinkDirective,
        DropZoneDirective,
        ShowAbleDirective,
        MenuItemDirective,
    ],
    exports: [
        ExternalLinkDirective,
        DropZoneDirective,
        ShowAbleDirective,
        MenuItemDirective,
    ]
})
export class SharedDirectivesModule {
}
