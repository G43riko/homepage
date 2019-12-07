import {NgModule} from "@angular/core";
import {CoreModule} from "../../shared/core.module";
import {SharedModule} from "../../shared/shared.module";
import {DurationPipe} from "./components/duration.pipe";
import {SongsNavBarComponent} from "./components/nav-bar.component";
import {SongControllerComponent} from "./components/song-controller/song-controller.component";
import {SongsListComponent} from "./components/songs-list/songs-list.component";
import {SongsComponent} from "./components/songs.component";
import {SongsHttpService} from "./services/songs-http.service";
import {SongsRoutingModule} from "./songs-routes.module";

@NgModule({
    declarations: [
        SongsComponent,
        DurationPipe,
        SongsListComponent,
        SongsNavBarComponent,
        SongControllerComponent,
    ],
    providers: [
        SongsHttpService,
    ],
    imports: [
        CoreModule,
        SharedModule,
        SongsRoutingModule,
    ],
    exports: [
        SongsComponent,
        SongsListComponent,
        SongsNavBarComponent,
    ],
})
export class SongsModule {
}
