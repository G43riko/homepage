import {Component, Input, OnInit} from "@angular/core";
import {Maker} from "../../models/maker.model";

declare const $: any;

@Component({
    selector: "app-movie-makers",
    templateUrl: "./makers-list.component.html",
    styleUrls: ["./makers-list.component.scss"],
})

export class MakersListComponent implements OnInit {
    @Input() public makers: Maker[] = [];
    @Input() public disabled = true;
    public activeMaker: Maker;

    public constructor() {
    }

    public ngOnInit(): void {
    }

    public removeMaker(index: number): void {
        this.makers.splice(index, 1);
    }

    public showMakerDetail(maker: Maker): void {
        $(".ui.modal").modal("show");
        this.activeMaker = maker;
        // alert("zobrazuje sa maker: " + makerId);
    }
}
