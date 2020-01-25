import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SongsListComponent} from "./components/songs-list/songs-list.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: SongsListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SongsRoutingModule {
}
