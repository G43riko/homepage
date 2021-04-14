import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { BehaviorSubject, combineLatest, of } from "rxjs";
import { distinctUntilChanged, first, map, mapTo, startWith, switchMap } from "rxjs/operators";
import { Roles } from "../../../shared/enums/roles.enum";
import { AuthService } from "../../../shared/services/auth.service";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
    selector       : "app-account-list",
    templateUrl    : "./account-list.component.html",
    styleUrls      : ["./account-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListComponent {
    public readonly roles: Roles[]   = Object.values(Roles);
    public readonly displayedColumns = ["displayName", "email", ...this.roles];
    public readonly accounts$        = this.authService.getAccounts().pipe(startWith([]));
    public readonly user$            = this.authService.user$;
    public readonly loading$         = new BehaviorSubject<boolean>(false);
    public readonly canUpdate$       = combineLatest([this.user$, this.loading$]).pipe(
        map(([user, loading]) => !loading && user && this.authService.checkAuthorization(user, Roles.ROLE_UPDATE_ACCOUNTS)),
        distinctUntilChanged(),
    );

    public constructor(private readonly authService: AuthService,
                       private readonly notificationService: NotificationService) {
    }

    public trackByFn(index: number, item: Roles): Roles {
        return item;
    }

    public changeRole(role: any, element: any, event: MatCheckboxChange): void {
        this.user$.pipe(
            switchMap((actualUser) => {
                if (!actualUser || !this.authService.checkAuthorization(actualUser, Roles.ROLE_UPDATE_ACCOUNTS)) {
                    return of(false);
                }

                this.loading$.next(true);

                return this.authService.updateRole(role, element, event.checked).pipe(
                    mapTo(true),
                );
            }),
            first(),
        ).subscribe({
            next    : (updated) => {
                if (updated) {
                    this.notificationService.openSuccessNotification("Role updated");
                } else {
                    this.notificationService.openInfoNotification("Role cannot be updated");
                }
            },
            error   : (error) => this.notificationService.openErrorNotification(error),
            complete: () => this.loading$.next(false),
        });
    }
}
