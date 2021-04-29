import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "app-image-dialog",
    templateUrl: "./image-dialog.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDialogComponent {
    public constructor(@Inject(MAT_DIALOG_DATA) public readonly imagesSrc: string[]) {
    }

}
