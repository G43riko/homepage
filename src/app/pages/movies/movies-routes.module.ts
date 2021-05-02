import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ObjectMergeComponent } from "../../shared/modules/object-merge/object-merge/object-merge.component";
import { CsfdUserDetailComponent } from "./components/csfd-user-detail/csfd-user-detail.component";
import { MakerDetailComponent } from "./components/maker-detail/maker-detail.component";
import { MakerListComponent } from "./components/maker-list/maker-list.component";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { MovieIndex } from "./components/movie-index";
import { MovieListComponent } from "./components/movie-list/movie-list.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: MovieIndex
            },
            {
                path: "list",
                component: MovieListComponent,
            },
            {
                path: "merge",
                component: ObjectMergeComponent,
            },
            {
                path: "makers/:id",
                component: MakerDetailComponent
            },
            {
                path: "makers",
                component: MakerListComponent
            },
            {
                path: "users/csfd/:id",
                component: CsfdUserDetailComponent
            },
            {
                path: "users/csfd",
                component: CsfdUserDetailComponent
            },
            {
                path: ":id",
                component: MovieDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MoviesRoutingModule {
}
