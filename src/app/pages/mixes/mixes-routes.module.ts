import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MixesListComponent } from "./mixes-list/mixes-list.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: MixesListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MixesRoutingModule {
}
