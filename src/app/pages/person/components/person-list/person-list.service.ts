import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin, Subject } from "rxjs";
import { shareReplay, startWith, switchMapTo } from "rxjs/operators";
import { PersonId } from "../../../../shared/models/person/person.model";
import { NotificationService } from "../../../../shared/services/notification.service";
import { PersonHttpService } from "../../services/person-http.service";

@Injectable()
export class PersonListService {
    private readonly fetchNewDataSource$ = new Subject();
    public readonly persons$             = this.fetchNewDataSource$.pipe(
        startWith([]),
        switchMapTo(this.personHttpService.getPersons()),
        shareReplay(1),
    );

    public constructor(
        private readonly personHttpService: PersonHttpService,
        private readonly notificationService: NotificationService,
        private readonly router: Router,
    ) {
    }

    public deletePerson(...personIds: PersonId[]): void {
        // concat(personIds.map((personId) => this.personHttpService.delete(personId)))
        forkJoin(personIds.map((personId) => this.personHttpService.delete(personId))).subscribe(() => {
            this.fetchNewDataSource$.next();
            this.notificationService.openSuccessNotification(`${personIds.length} persons successfully removed`);
        }, (error) => this.notificationService.openErrorNotification(error));
    }

    public showPersonCreateForm(): void {
        this.router.navigateByUrl("/persons/quick-create");
    }

    public showDetail(personId: number | string): void {
        this.router.navigateByUrl(`/persons/${personId}`);
    }
}
