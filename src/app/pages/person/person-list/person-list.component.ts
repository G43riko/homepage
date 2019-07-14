import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Roles } from "../../../shared/enums/roles.enum";
import { Person } from "../../../shared/models/person/person.model";
import { AuthService } from "../../../shared/services/auth.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { PersonService } from "../../../shared/services/person.service";
import { Paginator } from "../../../shared/utils/Paginator";
import { PersonListRowComponent } from "../person-list-row/person-list-row.component";

declare let $: any;

@Component({
    selector   : "app-person-list",
    templateUrl: "./person-list.component.html",
    // templateUrl: "./tmp-list.component.html",
    styleUrls  : ["./person-list.component.scss"],
})

export class PersonListComponent implements OnInit {
    public selectedAll: boolean;
    public paginator: Paginator<Person>;
    public readonly Roles = Roles;
    @ViewChildren(PersonListRowComponent) private rows: QueryList<PersonListRowComponent>;

    public constructor(private readonly route: ActivatedRoute,
                       private readonly router: Router,
                       public readonly authService: AuthService,
                       private readonly personService: PersonService,
                       private readonly notificationService: NotificationService) {
    }

    public get isAnySelected(): boolean {
        return this.rows.filter((row) => row.selected).length > 0;
    }

    public ngOnInit(): void {
        $(".ui.pointing.dropdown").dropdown({
            maxSelections: 3,
        });
        this.personService.getPersons().subscribe((data: Person[]) => {
            this.paginator = new Paginator(data);
        }, (error) => this.notificationService.showErrorMessage(error));
    }

    public selectAll(): void {
        this.rows.forEach((item) => item.selected = !this.selectedAll);
    }

    public createNew(): void {
        this.router.navigateByUrl("/persons/new");
    }

    public removeSelected(): void {
        this.rows.filter((row) => row.selected).forEach((row) => row.remove());
    }
}
