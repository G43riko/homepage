import { Routes } from "@angular/router";
import { AppConfig } from "../app.config";
import { HomeComponent } from "../pages/home/home.component";
import { PersonListComponent } from "../pages/person/person-list/person-list.component";
import { MovieDetailComponent } from "../pages/movies/movie-detail/movie-detail.component";
import { MovieListComponent } from "../pages/movies/movie-list/movie-list.component";
import { SongsListComponent } from "../pages/songs/songs-list/songs-list.component";
import { PersonDetailComponent } from "../pages/person/person-detail/person-detail.component";
import { AboutComponent } from "../pages/about/about.component";
import { AuthGuard } from "../auth.guard";
import { AccountProfileComponent } from "../pages/account-profile/account-profile.component";

export const ROUTES: Routes = [
    {
        path      : "",
        redirectTo: "/" + AppConfig.PATH_HOME,
        pathMatch : "full",
    },
    {
        path     : AppConfig.PATH_HOME,
        component: HomeComponent,
    },
    {
        path       : AppConfig.PATH_PROFILE,
        component  : AccountProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path       : AppConfig.PATH_PERSONS,
        component  : PersonListComponent,
        canActivate: [AuthGuard],
    },
    {
        path       : AppConfig.PATH_MOVIES + "/:id",
        component  : MovieDetailComponent,
        canActivate: [AuthGuard],
    },
    {
        path       : AppConfig.PATH_MOVIES,
        component  : MovieListComponent,
        canActivate: [AuthGuard],
    },
    // { path: AppConfig.PATH_SONGS, 					component: SongsComponent},
    {
        path       : AppConfig.PATH_SONGS,
        component  : SongsListComponent,
        canActivate: [AuthGuard],
    },
    {
        path       : AppConfig.PATH_PERSONS + "/:id",
        component  : PersonDetailComponent,
        canActivate: [AuthGuard],
    },
    {
        path     : AppConfig.PATH_ABOUT,
        component: AboutComponent,
    },
];
