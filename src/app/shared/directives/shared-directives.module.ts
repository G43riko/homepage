import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropZoneDirective } from "./drop-zone.directive";
import { ExternalLinkDirective } from "./external-link.directive";
import { ShowAbleDirective } from "./showable.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ExternalLinkDirective,
        DropZoneDirective,
        ShowAbleDirective,
    ],
    exports: [
        ExternalLinkDirective,
        DropZoneDirective,
        ShowAbleDirective
    ]
})
export class SharedDirectivesModule {
}
