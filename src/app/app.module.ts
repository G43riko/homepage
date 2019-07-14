import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppConfig } from "./app.config";
import { AccountProfileComponent } from "./pages/account-profile/account-profile.component";
import { CoreModule } from "./shared/core.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    declarations: [
        AppComponent,
        AccountProfileComponent,
    ],
    imports: [
        BrowserAnimationsModule, // NoopAnimationsModule
        CoreModule,
        SharedModule,
        AppRoutingModule,
        BrowserModule,
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
