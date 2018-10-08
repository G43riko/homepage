import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppConfig } from "./app.config";
import { AboutComponent } from "./pages/about/about.component";
import { HomeComponent } from "./pages/home/home.component";
import { MovieDetailComponent } from "./pages/movies/movie-detail/movie-detail.component";
import { MovieListComponent } from "./pages/movies/movie-list/movie-list.component";
import { PersonDetailComponent } from "./pages/person/person-detail/person-detail.component";
import { PersonListComponent } from "./pages/person/person-list/person-list.component";
import { SongsListComponent } from "./pages/songs/songs-list/songs-list.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/" + AppConfig.PATH_HOME,
        pathMatch: "full",
    },
    {
        path: AppConfig.PATH_HOME,
        component: HomeComponent,
    },
    {
        path: AppConfig.PATH_PERSONS,
        component: PersonListComponent,
    },
    {
        path: AppConfig.PATH_MOVIES + "/:id",
        component: MovieDetailComponent,
    },
    {
        path: AppConfig.PATH_MOVIES,
        component: MovieListComponent,
    },
    // { path: AppConfig.PATH_SONGS, 					component: SongsComponent},
    {
        path: AppConfig.PATH_SONGS,
        component: SongsListComponent,
    },
    {
        path: AppConfig.PATH_PERSONS + "/:id",
        component: PersonDetailComponent,
    },
    {
        path: AppConfig.PATH_ABOUT,
        component: AboutComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
