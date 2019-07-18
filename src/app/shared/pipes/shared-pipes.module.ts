import { NgModule } from "@angular/core";
import { ActivePipe } from "./active.pipe";
import { SafePipe } from "./safe.pipe";
import { FileSizePipe } from "./file-size.pipe";

@NgModule({
    declarations: [
        SafePipe,
        ActivePipe,
        FileSizePipe,
    ],
    exports: [
        SafePipe,
        ActivePipe,
        FileSizePipe,
    ],
})
export class SharedPipesModule {
}
