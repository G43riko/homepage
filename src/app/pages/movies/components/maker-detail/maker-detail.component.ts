import { Component, Input, OnInit } from "@angular/core";
import { Maker } from "../../models/maker.model";

@Component({
    selector: "app-maker-detail",
    templateUrl: "./maker-detail.component.html",
    styleUrls: ["./maker-detail.component.scss"],
})
export class MakerDetailComponent implements OnInit {
    @Input() public selectedMaker: Maker;
    public isDisabled = true;

    public constructor() {
    }

    public ngOnInit(): void {
    }

}
