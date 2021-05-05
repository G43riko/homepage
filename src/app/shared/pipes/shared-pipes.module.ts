import {NgModule} from "@angular/core";
import {ActivePipe} from "./active.pipe";
import {G43SafePipe} from "./g43-safe.pipe";
import {LocalTitlePipe} from "./local-title.pipe";
import {ParseUrlPipe} from "./parse-url.pipe";

@NgModule({
    declarations: [
        ActivePipe,
        LocalTitlePipe,
        ParseUrlPipe,
        G43SafePipe
    ],
    exports: [
        ActivePipe,
        LocalTitlePipe,
        ParseUrlPipe,
        G43SafePipe
    ]
})
export class SharedPipesModule {
}
