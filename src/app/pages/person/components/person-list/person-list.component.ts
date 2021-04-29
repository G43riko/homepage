import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { TableConfig } from "../../../../shared/components/abstract-table/table-config";
import { Person } from "../../../../shared/models/person/person.model";
import { AuthService } from "../../../../shared/services/auth.service";
import { PersonListService } from "./person-list.service";

@Component({
    selector       : "app-person-list",
    templateUrl    : "./person-list.component.html",
    styleUrls      : ["./person-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers      : [
        PersonListService,
    ]
})

export class PersonListComponent {
    public readonly user$                             = this.authService.user$;
    public readonly personData$: Observable<Person[]> = this.personService.persons$;
    public readonly personConfig: TableConfig<Person & {contacts: unknown, name: unknown, options: unknown}>         = {
        stickyEnd      : 3,
        columns        : [
            {
                name  : "contacts",
                nowrap: true,
            },
            {
                name         : "name",
                label        : "Name",
                customContent: (person) => (person.givenName || "") + " " + (person.familyName || "")
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
                name   : "accounts",
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
                action: () => alert("Action is not implemented"),
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

    public constructor(
        private readonly personService: PersonListService,
        private readonly authService: AuthService,
    ) {
    }

    public onRemoveClick(person: Person): void {
        this.personService.deletePerson(person.id);
    }

    public onAddPersonClick(): void {
        this.personService.showPersonCreateForm();
    }

    public onShowDetailClick(personId: number | string): void {
        this.personService.showDetail(personId);
    }
}
