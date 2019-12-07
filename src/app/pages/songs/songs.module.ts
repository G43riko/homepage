import {NgModule} from "@angular/core";
import {CoreModule} from "../../shared/core.module";
import {SharedModule} from "../../shared/shared.module";
import {DurationPipe} from "./components/duration.pipe";
import {SongsNavBarComponent} from "./components/nav-bar.component";
import {SongControllerComponent} from "./components/song-controller/song-controller.component";
import {SongsListComponent} from "./songs-list/songs-list.component";
import {SongsRoutingModule} from "./songs-routes.module";
import {SongsComponent} from "./songs.component";
import {SongsService} from "./songs.service";

@NgModule({
    declarations: [
        SongsComponent,
        DurationPipe,
        SongsListComponent,
        SongsNavBarComponent,
        SongControllerComponent,
    ],
    providers: [
        SongsService,
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
