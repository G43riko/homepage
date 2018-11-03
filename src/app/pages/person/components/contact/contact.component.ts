import { Component, Input, OnInit } from "@angular/core";
import { Email } from "../../../../shared/models/person/email.model";

declare let $: any;

@Component({
    selector   : "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls  : ["./contact.component.css"],
})

export class ContactComponent implements OnInit {
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
