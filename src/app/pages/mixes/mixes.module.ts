import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MixesListComponent } from "./mixes-list/mixes-list.component";
import { MixesRoutingModule } from "./mixes-routes.module";

@NgModule({
    declarations: [MixesListComponent],
    imports: [
        CommonModule,
        MixesRoutingModule
    ]
})
export class MixesModule {
}
