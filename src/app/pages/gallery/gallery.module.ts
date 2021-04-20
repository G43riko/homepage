import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../../shared/modules/material.module";
import { GalleryFilterComponent } from "./gallery-filter/gallery-filter.component";
import { GalleryHomeComponent } from "./gallery-home/gallery-home.component";
import { GalleryImageDetailComponent } from "./gallery-image-detail/gallery-image-detail.component";
import { GalleryRoutingModule } from "./gallery-routes.module";
import { GalleryComponent } from "./gallery/gallery.component";
import { SwapDirective } from "./swap.directive";


@NgModule({
    declarations: [
        GalleryHomeComponent,
        GalleryFilterComponent,
        GalleryComponent,
        GalleryImageDetailComponent,
        SwapDirective,
    ],
    imports     : [
        CommonModule,
        GalleryRoutingModule,
        MaterialModule,
    ]
})
export class GalleryModule {
}
