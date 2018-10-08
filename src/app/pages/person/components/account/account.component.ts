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

    public ngOnInit(): void {
        console.log(this.accountList);
        this._bindEvents();
    }

    public removeAccount(index: number): void {
        this.accountList.splice(index, 1);
    }

    public changeType(index: number, event: any): void {
        this.accountList[index].type = event.target.value;
    }

    public addAccount(): void {
        this.accountList.push(new Account("", ""));
        this._bindEvents();
    }

    public goTo(account: Account): void {
        window.open(Account.getLink(account), "_blank");
    }

    private _bindEvents(): void {
        setTimeout(() => {
            $(".ui.dropdown.button").dropdown({
                maxSelections: 3,
                allowAdditions: true,
            });
        }, 100);
    }

}
