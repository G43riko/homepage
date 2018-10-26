import { Component, Input, OnInit } from "@angular/core";
import { Phone } from "../../../../shared/models/person/phone.model";

declare let $: any;

@Component({
    selector: "app-phone",
    templateUrl: "./phone.component.html",
    styleUrls: ["./phone.component.scss"],
})

export class PhoneComponent implements OnInit {
    @Input() public disabled = true;
    @Input() public numberList: Phone[];

    public ngOnInit(): void {
        setTimeout(() => $(".ui.checkbox").checkbox(), 100);
    }

    public removeNumber(index: number): void {
        this.numberList.splice(index, 1);
    }

    public addNumber(): void {
        this.numberList.push(new Phone());
        setTimeout(() => $(".ui.checkbox").checkbox(), 100);
    }
}
