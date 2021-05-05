import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MixesListComponent} from "./mixes-list/mixes-list.component";
import {MixesRoutingModule} from "./mixes-routes.module";
import {SharedDirectivesModule} from "../../shared/directives/shared-directives.module";

@NgModule({
    declarations: [MixesListComponent],
    imports: [
        CommonModule,
        SharedDirectivesModule,
        MixesRoutingModule
    ]
})
export class MixesModule {
}
