import {ChangeDetectionStrategy, Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector   : "app-map-dialog",
    templateUrl: "./map-dialog.component.html",
    styleUrls  : ["./map-dialog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapDialogComponent {
    public constructor(@Inject(MAT_DIALOG_DATA) public readonly mapUrl: string) {
    }
}
