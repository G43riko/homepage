import { Component, Input, OnInit } from "@angular/core";
import { Email } from "../../../../shared/models/person/email.model";

declare let $: any;

@Component({
    selector: "app-email",
    templateUrl: "./email.component.html",
    styleUrls: ["./email.component.css"],
})

export class EmailComponent implements OnInit {
    @Input() public disabled = true;
    @Input() public emailList: Email[];

    public ngOnInit(): void {
        setTimeout(() => $(".ui.checkbox").checkbox(), 100);
    }

    public removeEmail(index: number): void {
        this.emailList.splice(index, 1);
    }

    public addEmail(): void {
        this.emailList.push(new Email());
        setTimeout(() => $(".ui.checkbox").checkbox(), 100);
    }
}
