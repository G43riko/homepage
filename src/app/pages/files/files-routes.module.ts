import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FileListComponent } from "./file-list/file-list.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: FileListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilesRoutingModule {
}
