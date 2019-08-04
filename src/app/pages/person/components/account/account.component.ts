import { Component, Input, OnInit } from "@angular/core";
import { Account } from "../../../../shared/models/person/account.model";

@Component({
    selector: "app-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.scss"],
})

export class AccountComponent implements OnInit {
    @Input() public disabled               = true;
    @Input() public accountList: Account[] = [];
    public accountTypes                    = Account.types;

    public ngOnInit(): void {
    }

    public removeAccount(index: number): void {
        this.accountList.splice(index, 1);
    }

    public changeType(index: number, event: any): void {
        this.accountList[index].type = event.target.value;
    }

    public addAccount(): void {
        this.accountList.push(new Account("", ""));
    }

    public goTo(account: Account): void {
        window.open(Account.getLink(account), "_blank");
    }
}
