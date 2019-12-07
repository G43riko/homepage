import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {TableConfig} from "../../../../shared/components/abstract-table/table-config";
import {Roles} from "../../../../shared/enums/roles.enum";
import {Person} from "../../../../shared/models/person/person.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {NotificationService} from "../../../../shared/services/notification.service";
import {PersonHttpService} from "../../services/person-http.service";

@Component({
    selector: "app-person-list",
    templateUrl: "./person-list.component.html",
    // templateUrl: "./tmp-list.component.html",
    styleUrls: ["./person-list.component.scss"],
})

export class PersonListComponent implements OnInit {
    public readonly Roles = Roles;
    public data: Person[];
    public personData: Observable<Person[]>;
    public personConfig: TableConfig;

    public constructor(private readonly route: ActivatedRoute,
                       private readonly router: Router,
                       public readonly authService: AuthService,
                       private readonly personHttpService: PersonHttpService,
                       private readonly notificationService: NotificationService) {
    }

    public ngOnInit(): void {
        this.personData = this.personHttpService.getPersons();
        // this.personService.getPersons().subscribe((data: Person[]) => {
        //     this.data = data;
        // }, (error) => this.notificationService.openErrorNotification(error));

        this.personConfig = {
            stickyEnd: 3,
            columns: [
                {
                    name: "contacts",
                },
                {
                    name: "name",
                    customContent: (person) => (person.name || "") + " " + (person.surName || ""),
                },
                {
                    name: "nick",
                    label: "Nick",
                    sort: true,
                },
                {
                    name: "birthday",
                    label: "Birthday",
                    sort: true,
                },
                {
                    name: "account",
                    label: "Account",
                    visible: false,
                },
                {
                    name: "options",
                    width: "9em",
                },
            ],
            selectOptions: [
                {
                    action: console.log,
                    icon: "delete",
                    label: "Delete",
                },
            ],
            stickyHeader: true,
            selection: "multi",
            paginateOptions: [5, 10, 20, 50, 100],
            pageSize: 10,
            paginator: true,
        };
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
