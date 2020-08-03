import { Routes } from "@angular/router";
import { AppStaticConfig } from "./appStaticConfig";
import { AuthGuard } from "./auth.guard";
import { AboutComponent } from "./pages/about/about.component";
import { ProjectsComponent } from "./pages/about/projects/projects.component";
import { AccountProfileComponent } from "./pages/account-profile/account-profile.component";
import { HomeComponent } from "./pages/home/home.component";
import { Roles } from "./shared/enums/roles.enum";

export const AppRoutes: Routes = [
    /*
        {
            path: "**",
            loadChildren: () => import("./pages/foods/foods.module").then(mod => mod.FoodsModule)
        },
     */

    {
        path      : "",
        redirectTo: "/" + AppStaticConfig.PATH_HOME,
        pathMatch : "full"
    },
    {
        path     : AppStaticConfig.PATH_HOME,
        component: HomeComponent
    },
    {
        path     : AppStaticConfig.PATH_PROJECTS,
        component: ProjectsComponent
    },
    {
        path        : AppStaticConfig.PATH_FILE_ANALYZER,
        loadChildren: () => import("./pages/analyzer/analyzer.module").then((mod) => mod.AnalyzerModule),
    },
    {
        path     : AppStaticConfig.PATH_ABOUT,
        component: AboutComponent
    },
    {
        path        : AppStaticConfig.PATH_MIXES,
        loadChildren: () => import("./pages/mixes/mixes.module").then((mod) => mod.MixesModule),
        canActivate : [AuthGuard],
        data        : {
            allowedFor: [Roles.ROLE_VISIT_MIXES]
        }
    },
    {
        path       : AppStaticConfig.PATH_PROFILE,
        component  : AccountProfileComponent,
        canActivate: [AuthGuard],
        data       : {
            allowedFor: [Roles.ROLE_VISITOR]
        }
    },
    {
        path            : AppStaticConfig.PATH_SONGS,
        loadChildren    : () => import("./pages/songs/songs.module").then((mod) => mod.SongsModule),
        canActivateChild: [AuthGuard],
        data            : {
            allowedFor: [Roles.ROLE_VISIT_SONGS]
        }
    },
    {
        path        : AppStaticConfig.PATH_FOODS,
        loadChildren: () => import("./pages/foods/foods.module").then((mod) => mod.FoodsModule)
    },
    {
        path            : AppStaticConfig.PATH_FILES,
        loadChildren    : () => import("./pages/files/files.module").then((mod) => mod.FilesModule),
        canActivateChild: [AuthGuard],
        data            : {
            allowedFor: [Roles.ROLE_VISIT_FILES]
        }
    },
    {
        path            : AppStaticConfig.PATH_ACCOUNTS,
        loadChildren    : () => import("./pages/accounts/accounts.module").then((mod) => mod.AccountsModule),
        canActivateChild: [AuthGuard],
        data            : {
            allowedFor: [Roles.ROLE_VISIT_ACCOUNTS]
        }
    },
    {
        path            : AppStaticConfig.PATH_MOVIES,
        loadChildren    : () => import("./pages/movies/movies.module").then((mod) => mod.MoviesModule),
        canActivateChild: [AuthGuard],
        data            : {
            allowedFor: [Roles.ROLE_VISIT_MOVIES]
        }
    },
    {
        path            : AppStaticConfig.PATH_PERSONS,
        loadChildren    : () => import("./pages/person/person.module").then((mod) => mod.PersonModule),
        canActivateChild: [AuthGuard],
        data            : {
            allowedFor: [Roles.ROLE_VISIT_PERSONS]
        }
    }
];
