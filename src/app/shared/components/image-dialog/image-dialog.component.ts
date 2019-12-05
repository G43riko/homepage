import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: "app-image-dialog",
    templateUrl: "./image-dialog.component.html",
    styleUrls: ["./image-dialog.component.scss"],
})
export class ImageDialogComponent implements OnInit {

    public constructor(public readonly dialogRef: MatDialogRef<ImageDialogComponent>,
                       @Inject(MAT_DIALOG_DATA) public readonly imgSrc: string) {
    }

    public ngOnInit(): void {
    }

}
