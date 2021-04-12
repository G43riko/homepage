import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { TableConfig } from "../../../../shared/components/abstract-table/table-config";
import { Roles } from "../../../../shared/enums/roles.enum";
import { Person } from "../../../../shared/models/person/person.model";
import { AuthService } from "../../../../shared/services/auth.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { PersonHttpService } from "../../services/person-http.service";

@Component({
    selector       : "app-person-list",
    templateUrl    : "./person-list.component.html",
    styleUrls      : ["./person-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PersonListComponent {
    public readonly Roles                             = Roles;
    public readonly personData$: Observable<Person[]> = this.personHttpService.getPersons();
    public readonly personConfig: TableConfig         = {
        stickyEnd      : 3,
        columns        : [
            {
                name  : "contacts",
                nowrap: true,
            },
            {
                name         : "name",
                customContent: (person) => (person.name || "") + " " + (person.surName || "")
            },
            {
                name : "nick",
                label: "Nick",
                sort : true
            },
            {
                name : "birthday",
                label: "Birthday",
                sort : true
            },
            {
                name   : "account",
                label  : "Account",
                visible: false
            },
            {
                name  : "options",
                width : "9em",
                nowrap: true,
            }
        ],
        selectOptions  : [
            {
                action: console.log,
                icon  : "delete",
                label : "Delete"
            }
        ],
        stickyHeader   : true,
        selection      : "multi",
        paginateOptions: [5, 10, 20, 50, 100],
        pageSize       : 10,
        paginator      : true
    };

    public constructor(private readonly route: ActivatedRoute,
                       private readonly router: Router,
                       public readonly authService: AuthService,
                       private readonly personHttpService: PersonHttpService,
                       private readonly notificationService: NotificationService) {
    }

    public remove(persons: Person[]): void {
        const deleteRequests = persons.map((person) => this.personHttpService.delete(person.id));
        forkJoin(deleteRequests).subscribe(() => {
            this.notificationService.openSuccessNotification("Person successfully removed");
        }, (error) => this.notificationService.openErrorNotification(error));
    }

    public createNew(): void {
        this.router.navigateByUrl("/persons/new");
    }

    public showDetail(person_id: number | string): void {
        this.router.navigateByUrl("/persons/" + person_id);
    }
}
