import {Component, Inject, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: "app-map-dialog",
    templateUrl: "./map-dialog.component.html",
    styleUrls: ["./map-dialog.component.scss"]
})
export class MapDialogComponent implements OnInit {
    public mapUrl: string;

    public constructor(public dialogRef: MatDialogRef<MapDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.mapUrl = data;
    }

    public ngOnInit(): void {
    }

}
