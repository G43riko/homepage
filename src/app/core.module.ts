import { CommonModule } from "@angular/common";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AuthService } from "./shared/auth.service";
import { MaterialModule } from "./shared/modules/material.module";
import { AccountsService } from "./shared/services/accounts.service";
import { MapsService } from "./shared/services/maps.service";
import { MoviesService } from "./shared/services/movies.service";
import { PersonService } from "./shared/services/person.service";
import { SongsService } from "./shared/services/songs.service";
import { YoutubeService } from "./shared/services/youtube.service";

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
