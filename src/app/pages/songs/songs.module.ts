import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
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
        SharedModule,
    ],
    exports: [
        SongsComponent,
        SongsListComponent,
        SongsNavBarComponent,
    ],
})
export class SongsModule {
}
