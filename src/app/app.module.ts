import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { MoviesModule } from "./pages/movies/movies.module";
import { PersonModule } from "./pages/person/person.module";
import { SongsModule } from "./pages/songs/songs.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    declarations: [
    ],
    imports: [
        SharedModule,
        BrowserModule,
        HttpClientModule,
        PersonModule,
        SongsModule,
        MoviesModule,
        HttpClientJsonpModule,
        AppRoutingModule,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
