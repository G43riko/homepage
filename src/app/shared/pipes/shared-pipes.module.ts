import { NgModule } from "@angular/core";
import { ActivePipe } from "./active.pipe";
import { SafePipe } from "./safe.pipe";

@NgModule({
    declarations: [
        SafePipe,
        ActivePipe,
    ],
    exports: [
        SafePipe,
        ActivePipe,
    ],
})
export class SharedPipesModule {
}
