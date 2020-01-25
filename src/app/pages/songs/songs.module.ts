import {NgModule} from "@angular/core";
import {CoreModule} from "../../shared/core.module";
import {SharedModule} from "../../shared/shared.module";
import {SongsNavBarComponent} from "./components/nav-bar/nav-bar.component";
import {SongControllerComponent} from "./components/song-controller/song-controller.component";
import {SongsListComponent} from "./components/songs-list/songs-list.component";
import {DurationPipe} from "./pipes/duration.pipe";
import {SongsHttpService} from "./services/songs-http.service";
import {SongsRoutingModule} from "./songs-routes.module";

@NgModule({
    declarations: [
        DurationPipe,
        SongsListComponent,
        SongsNavBarComponent,
        SongControllerComponent
    ],
    providers: [
        SongsHttpService
    ],
    imports: [
        CoreModule,
        SharedModule,
        SongsRoutingModule
    ],
    exports: [
        SongsListComponent,
        SongsNavBarComponent
    ]
})
export class SongsModule {
}
