import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ExternalLinkDirective } from "./external-link.directive";

@NgModule({
    imports     : [
        CommonModule,
    ],
    declarations: [
        ExternalLinkDirective,
    ],
    exports     : [
        ExternalLinkDirective
    ]
})
export class SharedDirectivesModule {
}
