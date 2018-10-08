import { Component, Input, OnInit } from "@angular/core";
import { Account } from "../../../../shared/models/person/account.model";

declare let $: any;

@Component({
    selector: "app-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.css"],
})

export class AccountComponent implements OnInit {
    @Input() public disabled               = true;
    @Input() public accountList: Account[] = [new Account("FACEBOOK", "gcsollei")];
    public accountTypes                    = Account.types;

    public ngOnInit() {
        console.log(this.accountList);
        this.bindEvents();
    }

    public removeAccount(index: number): void {
        this.accountList.splice(index, 1);
    }

    public changeType(index: number, event: any) {

        this.accountList[index].type = event.target.value;
    }

    public addAccount(): void {
        this.accountList.push(new Account("", ""));
        this.bindEvents();
    }

    public goTo(account: Account) {
        window.open(Account.getLink(account), "_blank");
    }

    private bindEvents() {
        setTimeout(() => {
            $(".ui.dropdown.button").dropdown({
                maxSelections: 3,
                allowAdditions: true,
            });
        }, 100);
    }

}
