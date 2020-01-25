import { NgModule } from "@angular/core";
import {G43SharedPipesModule} from "@g43/common";
import { ActivePipe } from "./active.pipe";

@NgModule({
    declarations: [
        ActivePipe
    ],
    exports: [
        ActivePipe,
        G43SharedPipesModule
    ]
})
export class SharedPipesModule {
}
