import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { User } from "../../../shared/models/auth.model";
import { Account } from "../../../shared/models/person/account.model";
import { Person } from "../../../shared/models/person/person.model";
import { Roles } from "../../../shared/enums/roles.enum";
import { Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";
import { PersonService } from "../../../shared/services/person.service";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
    selector   : "app-person-list-row",
    templateUrl: "./person-list-row.component.html",
    styleUrls  : ["./person-list-row.component.scss"],
})
export class PersonListRowComponent implements OnInit {
    @Input() public person: Person;
    @Input() public user: User;
    @Output() public readonly onRemove = new EventEmitter<number>();
    public selected                    = false;
    public readonly Roles              = Roles;
    @Input() private index: number;

    public constructor(private readonly router: Router,
                       private readonly personService: PersonService,
                       private readonly notificationService: NotificationService,
                       public readonly authService: AuthService) {

    }

    public ngOnInit(): void {
    }

    public remove(): void {
        this.personService.delete(this.person.person_id).subscribe(() => {
            this.onRemove.emit(this.index);
            this.notificationService.showSuccessMessage("Person successfully removed");
        }, (error) => this.notificationService.showErrorMessage(error));
    }

    public getTitle(account: Account): string {
        return "[" + account.userName + "] - " + Account.getLink(account);
    }

    public goTo(account: Account): void {
        window.open(Account.getLink(account), "_blank");
    }

    public getLink(account: Account): string {
        return Account.getLink(account);
    }

    public getIcon(account: Account): string {
        return Account.getIcon(account);
    }

    public showDetail(person_id: number | string): void {
        this.router.navigateByUrl("/persons/" + person_id);
    }
}
