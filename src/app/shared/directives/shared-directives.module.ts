import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ExternalLinkDirective } from "./external-link.directive";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ExternalLinkDirective,
    ],
})
export class SharedDirectivesModule {
}
