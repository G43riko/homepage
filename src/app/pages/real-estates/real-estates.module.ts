import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {RealEstateDetailComponent} from "./real-estate-detail/real-estate-detail.component";
import {RealEstateHttpService} from "./real-estate-http.service";
import {RealEstateListComponent} from "./real-estate-list/real-estate-list.component";
import {RealEstateRoutingModule} from "./real-estates-routes.module";
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        RealEstateRoutingModule,
        SharedModule,
        MaterialModule,
        TranslateModule,
        CommonModule,
    ],
    providers: [
        RealEstateHttpService
    ],
    declarations: [
        RealEstateListComponent,
        RealEstateDetailComponent
    ]
})
export class RealEstatesModule {

}
