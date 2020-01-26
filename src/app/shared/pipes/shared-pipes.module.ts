import { NgModule } from "@angular/core";
import { ActivePipe } from "./active.pipe";
import { LocalTitlePipe } from "./local-title.pipe";
import { ParseUrlPipe } from "./parse-url.pipe";

@NgModule({
    declarations: [
        ActivePipe,
        LocalTitlePipe,
        ParseUrlPipe
    ],
    exports: [
        ActivePipe,
        LocalTitlePipe,
        ParseUrlPipe,
    ]
})
export class SharedPipesModule {
}
