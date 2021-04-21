import { ChangeDetectionStrategy, Component } from "@angular/core";
import { GalleryService } from "./gallery-service";

@Component({
    selector       : "app-gallery",
    templateUrl    : "./gallery.component.html",
    styleUrls      : ["./gallery.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
    public readonly images$ = this.galleryService.images$;

    public constructor(
        private readonly galleryService: GalleryService,
    ) {
    }
    public onImageAtIndex(index: number): void {
        this.galleryService.openImageAtIndex(index);
    }
}
