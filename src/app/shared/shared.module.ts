import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedComponentsModule } from "./components/shared-components.module";
import { SharedDirectivesModule } from "./directives/shared-directives.module";
import { fakeBackendProvider } from "./services/fake-backend-interceptor.service";
import { CoreModule } from "./services/core.module";
import { AppComponent } from "../app.component";
import { HomeComponent } from "../pages/home/home.component";
import { AboutComponent } from "../pages/about/about.component";

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedDirectivesModule,
        SharedComponentsModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
    ],
    providers: [
        fakeBackendProvider,
    ],
    exports: [
        CommonModule,
        SharedDirectivesModule,
        SharedComponentsModule,
    ],
})
export class SharedModule {
}
