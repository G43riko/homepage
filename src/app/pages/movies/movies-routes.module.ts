import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MakerDetailComponent} from "./components/maker-detail/maker-detail.component";
import {MakerListComponent} from "./components/maker-list/maker-list.component";
import {MovieDetailComponent} from "./components/movie-detail/movie-detail.component";
import {MovieListComponent} from "./components/movie-list/movie-list.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: MovieListComponent,
            },
            {
                path: "makers/:id",
                component: MakerDetailComponent,
            },
            {
                path: "makers",
                component: MakerListComponent,
            },
            {
                path: ":id",
                component: MovieDetailComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MoviesRoutingModule {
}
