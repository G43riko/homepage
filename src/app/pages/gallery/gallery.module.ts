import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GalleryFilterComponent } from './gallery-filter/gallery-filter.component';
import { GalleryHomeComponent } from './gallery-home/gallery-home.component';
import { GalleryComponent } from './gallery/gallery.component';


@NgModule({
    declarations: [
    GalleryHomeComponent,
    GalleryFilterComponent,
    GalleryComponent
  ],
    imports     : [
        CommonModule
    ]
})
export class GalleryModule {
}
