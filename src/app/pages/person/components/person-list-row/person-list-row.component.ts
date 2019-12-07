import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {MatPaginator, MatSort} from "@angular/material";
import {Router} from "@angular/router";
import {Roles} from "../../../../shared/enums/roles.enum";
import {User} from "../../../../shared/models/auth.model";
import {Account} from "../../../../shared/models/person/account.model";
import {Person} from "../../../../shared/models/person/person.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {NotificationService} from "../../../../shared/services/notification.service";
import {PersonHttpService} from "../../person-http.service";
import {PersonListRowCellSelectComponent} from "../person-list-row-cell-select/person-list-row-cell-select.component";

@Component({
    selector: "app-person-list-row",
    templateUrl: "./person-list-row.component.html",
    styleUrls: ["./person-list-row.component.scss"],
})
export class PersonListRowComponent implements OnInit {
    @Input() public person: Person;
    @Input() public user: User;
    @Output() public readonly onRemove = new EventEmitter<number>();
    public readonly Roles = Roles;
    @Input() private readonly index: number;
    @ViewChild(MatPaginator, {static: true}) private readonly paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) private readonly sort: MatSort;
    @ViewChild(PersonListRowCellSelectComponent, {static: false}) public personListCellSelect: PersonListRowCellSelectComponent;

    public constructor(private readonly router: Router,
                       private readonly personService: PersonHttpService,
                       private readonly notificationService: NotificationService,
                       public readonly authService: AuthService) {

    }

    public ngOnInit(): void {
    }

    public getTitle(account: Account): string {
        return "[" + account.userName + "] - " + Account.getLink(account);
    }

    public getIcon(account: Account): string {
        return Account.getIcon(account);
    }

    public goTo(account: Account): void {
        window.open(Account.getLink(account), "_blank");
    }

    public getLink(account: Account): string {
        return Account.getLink(account);
    }

    public remove(): void {
        this.personService.delete(this.person.id).subscribe(() => {
            this.onRemove.emit(this.index);
            this.notificationService.openSuccessNotification("Person successfully removed");
        }, (error) => this.notificationService.openErrorNotification(error));
    }

    public showDetail(person_id: number | string): void {
        this.router.navigateByUrl("/persons/" + person_id);
    }
}
