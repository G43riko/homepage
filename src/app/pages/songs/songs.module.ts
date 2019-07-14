import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { SongsNavBarComponent } from "./components/nav-bar.component";
import { SongsListComponent } from "./songs-list/songs-list.component";
import { SongsComponent } from "./songs.component";
import { CoreModule } from "../../shared/core.module";
import { SongsRoutingModule } from "./songs-routes.module";
import { SongControllerComponent } from "./components/song-controller/song-controller.component";

@NgModule({
    declarations: [
        SongsComponent,
        SongsListComponent,
        SongsNavBarComponent,
        SongControllerComponent,
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
