import {NgModule} from "@angular/core";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {G43_NOTIFICATION_TOKEN} from "@g43/common";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AppConfig} from "./app.config";
import {AccountProfileComponent} from "./pages/account-profile/account-profile.component";
import {CoreModule} from "./shared/core.module";
import {FirebaseModule} from "./shared/modules/firebase.module";
import {NotificationService} from "./shared/services/notification.service";
import {SharedModule} from "./shared/shared.module";

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
            provide: G43_NOTIFICATION_TOKEN, useClass: NotificationService,
        },
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
