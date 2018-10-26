import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthService } from "./shared/auth.service";
import { AccountsService } from "./shared/services/accounts.service";
import { MapsService } from "./shared/services/maps.service";
import { MoviesService } from "./shared/services/movies.service";
import { PersonService } from "./shared/services/person.service";
import { SongsService } from "./shared/services/songs.service";
import { YoutubeService } from "./shared/services/youtube.service";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./shared/material-module/material.module";

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        MaterialModule,
        HttpClientJsonpModule,
        BrowserAnimationsModule, // NoopAnimationsModule
    ],
    declarations: [],
    providers: [
        SongsService,
        AuthService,
        AccountsService,
        YoutubeService,
        MoviesService,
        MapsService,
        PersonService,
    ],
    exports: [
        AppRoutingModule,
        CommonModule,
        FormsModule,
        MaterialModule,
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule,
        BrowserAnimationsModule, // NoopAnimationsModule
    ],
})
export class CoreModule {
}
