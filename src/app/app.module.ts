import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AccountProfileComponent } from "./pages/account-profile/account-profile.component";
import { CoreModule } from "./shared/core.module";
import { SharedModule } from "./shared/shared.module";
import { FirebaseModule } from "./shared/modules/firebase.module";

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
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
