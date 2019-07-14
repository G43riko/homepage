import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SongsListComponent } from "./songs-list/songs-list.component";
import { SongsComponent } from "./songs.component";

const routes: Routes = [
    {
        path    : "",
        children: [
            {
                path     : "",
                pathMatch: "full",
                component: SongsListComponent,
            },
            {
                path     : ":id",
                component: SongsComponent,
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SongsRoutingModule {
}
