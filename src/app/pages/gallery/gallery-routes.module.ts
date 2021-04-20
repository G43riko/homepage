import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GalleryHomeComponent } from "./gallery-home/gallery-home.component";
import { GalleryImageDetailComponent } from "./gallery-image-detail/gallery-image-detail.component";

const routes: Routes = [
    {
        path: "",
        component: GalleryHomeComponent,
        children: [
            {
                path: ":id",
                component: GalleryImageDetailComponent,
            }
        ]
    },
    {
        path: "**",
        redirectTo: "",
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GalleryRoutingModule {
}
