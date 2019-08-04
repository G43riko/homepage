import { NgModule } from "@angular/core";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {AppConfig} from "./app.config";
import { AccountProfileComponent } from "./pages/account-profile/account-profile.component";
import { CoreModule } from "./shared/core.module";
import { FirebaseModule } from "./shared/modules/firebase.module";
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
        FirebaseModule,
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: AppConfig.DEFAULT_ALERT_DURATION,
            },
        },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
