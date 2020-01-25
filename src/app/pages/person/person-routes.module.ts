import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PersonDetailComponent} from "./components/person-detail/person-detail.component";
import {PersonListComponent} from "./components/person-list/person-list.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: PersonListComponent
            },
            {
                path: ":id",
                component: PersonDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonRoutingModule {
}
