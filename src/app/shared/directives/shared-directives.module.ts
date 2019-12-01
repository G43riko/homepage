import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DropZoneDirective} from "./drop-zone.directive";
import {ExternalLinkDirective} from "./external-link.directive";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ExternalLinkDirective,
        DropZoneDirective,
    ],
    exports: [
        ExternalLinkDirective,
        DropZoneDirective,
    ],
})
export class SharedDirectivesModule {
}
