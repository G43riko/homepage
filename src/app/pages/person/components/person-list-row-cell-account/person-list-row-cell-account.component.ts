import {Component, Input, OnInit} from "@angular/core";
import {Account} from "../../../../shared/models/person/account.model";
import {Person} from "../../../../shared/models/person/person.model";

@Component({
    selector: "app-person-list-row-cell-account",
    templateUrl: "./person-list-row-cell-account.component.html",
    styleUrls: ["./person-list-row-cell-account.component.scss"]
})
export class PersonListRowCellAccountComponent implements OnInit {

    @Input() public person: Person;

    constructor() {
    }

    public ngOnInit(): void {
    }

    public getTitle(account: Account): string {
        return "[" + account.userName + "] - " + Account.getLink(account);
    }

    public getIcon(account: Account): string {
        return Account.getIcon(account);
    }
}
