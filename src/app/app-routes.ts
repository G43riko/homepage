import {Routes} from "@angular/router";
import {AppConfig} from "./app.config";
import {AuthGuard} from "./auth.guard";
import {AboutComponent} from "./pages/about/about.component";
import {AccountProfileComponent} from "./pages/account-profile/account-profile.component";
import {HomeComponent} from "./pages/home/home.component";
import {Roles} from "./shared/enums/roles.enum";

export const AppRoutes: Routes = [
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
        path     : AppConfig.PATH_ABOUT,
        component: AboutComponent,
    },
    {
        path: AppConfig.PATH_MIXES,
        loadChildren: () => import("./pages/mixes/mixes.module").then((mod) => mod.MixesModule),
        canActivate: [AuthGuard],
        data       : {
            allowedFor: [Roles.ROLE_VISIT_MIXES],
        },
    },
    {
        path: AppConfig.PATH_PROFILE,
        component: AccountProfileComponent,
        canActivate: [AuthGuard],
        data: {
            allowedFor: [Roles.ROLE_VISITOR],
        },
    },
    {
        path: AppConfig.PATH_SONGS,
        loadChildren: () => import("./pages/songs/songs.module").then((mod) => mod.SongsModule),
        canActivateChild: [AuthGuard],
        data: {
            allowedFor: [Roles.ROLE_VISIT_SONGS],
        },
    },
    {
        path: AppConfig.PATH_FOODS,
        loadChildren: () => import("./pages/foods/foods.module").then((mod) => mod.FoodsModule),
        canActivateChild: [AuthGuard],
        data: {
            allowedFor: [Roles.ROLE_VISIT_FOODS],
        },
    },
    {
        path: AppConfig.PATH_FILES,
        loadChildren: () => import("./pages/files/files.module").then((mod) => mod.FilesModule),
        canActivateChild: [AuthGuard],
        data: {
            allowedFor: [Roles.ROLE_VISIT_FILES],
        },
    },
    {
        path: AppConfig.PATH_ACCOUNTS,
        loadChildren: () => import("./pages/accounts/accounts.module").then((mod) => mod.AccountsModule),
        canActivateChild: [AuthGuard],
        data: {
            allowedFor: [Roles.ROLE_VISIT_ACCOUNTS],
        },
    },
    {
        path            : AppConfig.PATH_MOVIES,
        loadChildren    : () => import("./pages/movies/movies.module").then((mod) => mod.MoviesModule),
        canActivateChild: [AuthGuard],
        data            : {
            allowedFor: [Roles.ROLE_VISIT_MOVIES],
        },
    },
    {
        path            : AppConfig.PATH_PERSONS,
        loadChildren    : () => import("./pages/person/person.module").then((mod) => mod.PersonModule),
        canActivateChild: [AuthGuard],
        data            : {
            allowedFor: [Roles.ROLE_VISIT_PERSONS],
        },
    },
];
