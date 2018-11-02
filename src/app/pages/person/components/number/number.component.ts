import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material";
import { Phone } from "../../../../shared/models/person/phone.model";

@Component({
    selector: "app-numbers",
    templateUrl: "./number.component.html",
    styleUrls: ["./number.component.scss"],
})
export class NumberComponent implements OnInit {
    @Input() public disabled            = true;
    @Input() public numberList: Phone[] = [];
    public showInactive                 = new FormControl(false);
    public visible                      = true;
    public addOnBlur                    = true;

    public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    public ngOnInit(): void {
    }

    public add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || "").trim()) {
            this.numberList.push(new Phone(value.trim()));
        }

        if (input) {
            input.value = "";
        }
    }

    public remove(index: number): void {
        if (index >= 0) {
            this.numberList.splice(index, 1);
        }
    }
}
