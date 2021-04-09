import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedComponentsModule } from "../../shared/components/shared-components.module";
import { SharedDirectivesModule } from "../../shared/directives/shared-directives.module";
import { MaterialModule } from "../../shared/modules/material.module";
import { SharedPipesModule } from "../../shared/pipes/shared-pipes.module";
import { AboutComponent } from "./about.component";
import { AboutService } from "./about.service";
import { ProjectsComponent } from "./projects/projects.component";

@NgModule({
    imports     : [
        TranslateModule,
        CommonModule,
        SharedPipesModule,
        SharedDirectivesModule,
        SharedComponentsModule,
        MaterialModule,
    ],
    providers   : [
        AboutService,
    ],
    declarations: [
        AboutComponent,
        ProjectsComponent,
    ],
    exports     : [
        AboutComponent,
    ]
})
export class AboutModule {

}
