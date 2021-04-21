import { ChangeDetectionStrategy, Component } from "@angular/core";
import { GalleryService } from "../gallery/gallery-service";

@Component({
    selector       : "app-gallery-home",
    templateUrl    : "./gallery-home.component.html",
    styleUrls      : ["./gallery-home.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        GalleryService
    ],
})
export class GalleryHomeComponent {

}
