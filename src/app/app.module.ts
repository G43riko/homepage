import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { G43_NOTIFICATION_TOKEN } from "@g43/common";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppConfig } from "./app.config";
import { AccountProfileComponent } from "./pages/account-profile/account-profile.component";
import { CoreModule } from "./shared/core.module";
import { FirebaseModule } from "./shared/modules/firebase.module";
import { NotificationService } from "./shared/services/notification.service";
import { SharedModule } from "./shared/shared.module";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        AppComponent,
        AccountProfileComponent
    ],
    imports: [
        BrowserAnimationsModule, // NoopAnimationsModule
        CoreModule,
        SharedModule,
        AppRoutingModule,
        BrowserModule,
        FirebaseModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ServiceWorkerModule.register("ngsw-worker.js", {enabled: environment.production})
    ],
    providers: [
        {
            provide: G43_NOTIFICATION_TOKEN, useClass: NotificationService
        },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: AppConfig.DEFAULT_ALERT_DURATION
            }
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
