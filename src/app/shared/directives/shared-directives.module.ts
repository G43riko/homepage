import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ExternalLinkDirective } from "./external-link.directive";
import { DropZoneDirective } from "./drop-zone.directive";

@NgModule({
    imports     : [
        CommonModule,
    ],
    declarations: [
        ExternalLinkDirective,
        DropZoneDirective,
    ],
    exports     : [
        ExternalLinkDirective
    ]
})
export class SharedDirectivesModule {
}
