import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./shared/app-routing.module";
import { AppComponent } from "./app.component";
import { MoviesModule } from "./pages/movies/movies.module";
import { PersonModule } from "./pages/person/person.module";
import { SongsModule } from "./pages/songs/songs.module";
import { SharedModule } from "./shared/shared.module";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AppConfig } from "./app.config";
import { AccountProfileComponent } from "./pages/account-profile/account-profile.component";

@NgModule({
    declarations: [
        AppComponent,
        AccountProfileComponent,
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        PersonModule,
        SongsModule,
        MoviesModule,

        AngularFireModule.initializeApp(AppConfig.FIREBASE_AUTH),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
