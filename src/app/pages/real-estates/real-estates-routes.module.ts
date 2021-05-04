import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RealEstateDetailComponent} from "./real-estate-detail/real-estate-detail.component";
import {RealEstateListComponent} from "./real-estate-list/real-estate-list.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: RealEstateListComponent
            },
            {
                path: ":id",
                component: RealEstateDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RealEstateRoutingModule {
}
