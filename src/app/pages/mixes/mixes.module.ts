import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { G43SharedPipesModule } from "@g43/common";
import { SharedModule } from "../../shared/shared.module";
import { MixesListComponent } from "./mixes-list/mixes-list.component";
import { MixesRoutingModule } from "./mixes-routes.module";

@NgModule({
    declarations: [MixesListComponent],
    imports: [
        CommonModule,
        G43SharedPipesModule,
        MixesRoutingModule
    ]
})
export class MixesModule {
}
