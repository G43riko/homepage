import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ObjectMergeComponent} from "../../shared/modules/object-merge/object-merge/object-merge.component";
import {CsfdUserDetailComponent} from "./components/csfd-user-detail/csfd-user-detail.component";
import {PopularMoviesComponent} from "./components/external-movie-list/popular-movies.component";
import {TopRatedMoviesComponent} from "./components/external-movie-list/top-rated-movies.component";
import {MakerDetailComponent} from "./components/maker-detail/maker-detail.component";
import {MakerListComponent} from "./components/maker-list/maker-list.component";
import {MovieDetailComponent} from "./components/movie-detail/movie-detail.component";
import {MovieIndex} from "./components/movie-index";
import {MovieListComponent} from "./components/movie-list/movie-list.component";
import {IncompleteMoviesComponent} from "./components/Incomplete-movies/incomplete-movies.component";

const routes: Routes = [
    {
        path: "",
        component: MovieIndex,
        children: [
            {
                path: "",
                component: PopularMoviesComponent,
                pathMatch: "full"
            },
            {
                path: "top-rated",
                component: TopRatedMoviesComponent,
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
                path: "incomplete",
                component: IncompleteMoviesComponent,
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
            },

            {
                path     : "**",
                redirectTo: ""
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
