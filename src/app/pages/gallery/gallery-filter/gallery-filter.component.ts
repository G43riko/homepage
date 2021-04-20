import { ChangeDetectionStrategy, Component } from "@angular/core";
import { of } from "rxjs";

@Component({
    selector   : "app-gallery-filter",
    templateUrl: "./gallery-filter.component.html",
    styleUrls  : ["./gallery-filter.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryFilterComponent {
    public readonly labels$ = of([{name: "Blender"}, {name: "Cinema 4D"}]);

    public constructor() {
    }

}
