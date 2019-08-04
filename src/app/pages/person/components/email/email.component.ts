import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material";
import { Email } from "../../../../shared/models/person/email.model";

@Component({
    selector: "app-email",
    templateUrl: "./email.component.html",
    styleUrls: ["./email.component.scss"],
})
export class EmailComponent implements OnInit {
    @Input() public disabled           = true;
    @Input() public emailList: Email[] = [];
    @Input() public isNew: boolean;
    public showInactive                = new FormControl(false);
    public visible                     = true;
    public addOnBlur                   = true;

    public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    public ngOnInit(): void {
    }

    public add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || "").trim()) {
            this.emailList.push(new Email(value.trim()));
        }

        if (input) {
            input.value = "";
        }
    }

    public remove(index: number): void {
        if (index >= 0) {
            this.emailList.splice(index, 1);
        }
    }
}
