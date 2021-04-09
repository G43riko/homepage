import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { environment } from "../../environments/environment";
import { AboutModule } from "../pages/about/about.module";
import { HomeComponent } from "../pages/home/home.component";
import { SharedComponentsModule } from "./components/shared-components.module";
import { CoreModule } from "./core.module";
import { SharedDirectivesModule } from "./directives/shared-directives.module";
import { MaterialModule } from "./modules/material.module";
import { SharedPipesModule } from "./pipes/shared-pipes.module";
import { fakeBackendProvider } from "./services/fake-backend-interceptor.service";

const interceptor = [];
if (environment.interceptor) {
    interceptor.push(fakeBackendProvider);
}

@NgModule({
    imports     : [
        CoreModule,
        MaterialModule,
        TranslateModule,
        RouterModule,
        AboutModule,
        SharedPipesModule,
        SharedComponentsModule,
        SharedDirectivesModule,
    ],
    declarations: [
        HomeComponent,
    ],
    providers   : [
        ...interceptor
    ],
    exports     : [
        TranslateModule,
        SharedDirectivesModule,
        SharedComponentsModule,
        SharedPipesModule
    ]
})
export class SharedModule {
}
