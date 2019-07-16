import { Routes } from "@angular/router";
import { AppConfig } from "./app.config";
import { AuthGuard } from "./auth.guard";
import { AboutComponent } from "./pages/about/about.component";
import { AccountProfileComponent } from "./pages/account-profile/account-profile.component";
import { HomeComponent } from "./pages/home/home.component";
import { Roles } from "./shared/enums/roles.enum";

export const AppRoutes: Routes = [
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
        path     : AppConfig.PATH_ABOUT,
        component: AboutComponent,
    },
    {
        path       : AppConfig.PATH_PROFILE,
        component  : AccountProfileComponent,
        canActivate: [AuthGuard],
        data       : {
            allowedFor: [Roles.ROLE_VISITOR],
        },
    },
    {
        path            : AppConfig.PATH_SONGS,
        loadChildren    : "./pages/songs/songs.module#SongsModule",
        canActivateChild: [AuthGuard],
        data            : {
            allowedFor: [Roles.ROLE_VISIT_SONGS],
        },
    },
    {
        path: AppConfig.PATH_FILES,
        loadChildren: "./pages/files/files.module#FilesModule",
        canActivateChild: [AuthGuard],
        data: {
            allowedFor: [Roles.ROLE_VISIT_FILES],
        },
    },
    {
        path: AppConfig.PATH_ACCOUNTS,
        loadChildren: "./pages/accounts/accounts.module#AccountsModule",
        canActivateChild: [AuthGuard],
        data: {
            allowedFor: [Roles.ROLE_VISIT_ACCOUNTS],
        },
    },
    {
        path            : AppConfig.PATH_MOVIES,
        loadChildren    : "./pages/movies/movies.module#MoviesModule",
        canActivateChild: [AuthGuard],
        data            : {
            allowedFor: [Roles.ROLE_VISIT_MOVIES],
        },
    },
    {
        path            : AppConfig.PATH_PERSONS,
        loadChildren    : "./pages/person/person.module#PersonModule",
        canActivateChild: [AuthGuard],
        data            : {
            allowedFor: [Roles.ROLE_VISIT_PERSONS],
        },
    },
];
