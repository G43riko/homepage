import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { SongsService } from "../../shared/services/songs.service";
import { YoutubeService } from "../../shared/services/youtube.service";
import { SongsNavBarComponent } from "./components/nav-bar.component";
import { SongsListComponent } from "./songs-list/songs-list.component";
import { SongsComponent } from "./songs.component";

@NgModule({
    declarations: [
        SongsComponent,
        SongsListComponent,
        SongsNavBarComponent,
    ],
    imports: [
        BrowserModule,
    ],
    exports: [
        SongsComponent,
        SongsListComponent,
        SongsNavBarComponent,
    ],
    providers: [
        SongsService,
        YoutubeService,
    ],
})
export class SongsModule {
}
