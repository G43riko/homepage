import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { MoviesModule } from "./pages/movies/movies.module";
import { PersonModule } from "./pages/person/person.module";
import { SongsModule } from "./pages/songs/songs.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        SharedModule,
        PersonModule,
        SongsModule,
        MoviesModule,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
