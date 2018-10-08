import { Component, Input, OnInit } from "@angular/core";
import { Maker } from "../models/maker.model";

declare const $: any;

@Component({
    selector: "app-movie-makers",
    templateUrl: "./movie-makers.component.html",
    styleUrls: ["./movie-makers.component.scss"],
})

export class MovieMakersComponent implements OnInit {
    @Input() public makers: Maker[] = [];
    @Input() public disabled        = true;
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
