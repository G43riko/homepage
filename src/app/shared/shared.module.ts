import { NgModule } from "@angular/core";
import { AboutComponent } from "../pages/about/about.component";
import { HomeComponent } from "../pages/home/home.component";
import { SharedComponentsModule } from "./components/shared-components.module";
import { SharedDirectivesModule } from "./directives/shared-directives.module";
import { fakeBackendProvider } from "./services/fake-backend-interceptor.service";
import { CoreModule } from "../core.module";

@NgModule({
    imports: [
        CoreModule,
        SharedDirectivesModule,
        SharedComponentsModule,
    ],
    declarations: [
        HomeComponent,
        AboutComponent,
    ],
    providers: [
        fakeBackendProvider,
    ],
    exports: [
        CoreModule,
        SharedDirectivesModule,
        SharedComponentsModule,
    ],
})
export class SharedModule {
}
