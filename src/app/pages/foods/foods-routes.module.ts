import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FoodsOverviewComponent} from "./components/foods-overview/foods-overview.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: FoodsOverviewComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FoodsRoutingModule {
}
