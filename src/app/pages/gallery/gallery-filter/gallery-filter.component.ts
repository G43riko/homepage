import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatChip } from "@angular/material/chips";
import { GalleryService } from "../gallery/gallery-service";

@Component({
    selector   : "app-gallery-filter",
    templateUrl: "./gallery-filter.component.html",
    styleUrls  : ["./gallery-filter.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryFilterComponent {
    // public readonly labels$ = of([{givenName: "Blender"}, {givenName: "Cinema 4D"}]);
    public readonly labels$ = this.galleryService.tags$;

    public constructor(
        private readonly galleryService: GalleryService,
    ) {
    }

    public onChange(event: MatChip[]): void {
        this.galleryService.setFilter(event.map((chip) => chip.value));
    }
}
