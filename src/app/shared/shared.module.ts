import { NgModule } from "@angular/core";
import { AboutComponent } from "../pages/about/about.component";
import { HomeComponent } from "../pages/home/home.component";
import { SharedComponentsModule } from "./components/shared-components.module";
import { CoreModule } from "./core.module";
import { SharedDirectivesModule } from "./directives/shared-directives.module";
import { SharedPipesModule } from "./pipes/shared-pipes.module";
import { fakeBackendProvider } from "./services/fake-backend-interceptor.service";

@NgModule({
    imports: [
        CoreModule,
    ],
    declarations: [
        HomeComponent,
        AboutComponent,
    ],
    providers: [
        fakeBackendProvider,
    ],
    exports: [
        SharedDirectivesModule,
        SharedComponentsModule,
        SharedPipesModule,
    ],
})
export class SharedModule {
}
