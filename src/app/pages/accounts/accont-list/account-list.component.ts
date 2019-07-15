import { Component, OnInit } from "@angular/core";
import { MatCheckboxChange } from "@angular/material";
import { Roles } from "../../../shared/enums/roles.enum";
import { User } from "../../../shared/models/auth.model";
import { AuthService } from "../../../shared/services/auth.service";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
    selector: "app-account-list",
    templateUrl: "./account-list.component.html",
    styleUrls: ["./account-list.component.scss"],
})
export class AccountListComponent implements OnInit {
    public readonly Roles = Roles;
    public readonly roles = Object.values(Roles);
    public displayedColumns = ["displayName", "email", ...this.roles];
    public accounts: User[] = [];

    public constructor(private readonly authService: AuthService,
                       private readonly notificationService: NotificationService) {
    }

    public ngOnInit(): void {
        this.authService.getAccounts().subscribe((data) => {
            this.accounts = data;
        });
    }

    public changeRole(role: any, element: any, actualUser: User, event: MatCheckboxChange): void {
        if (!this.authService.checkAuthorization(actualUser, Roles.ROLE_UPDATE_ACCOUNTS)) {
            return;
        }
        this.authService.updateRole(role, element, event.checked).subscribe(() => {
            this.notificationService.showSuccessMessage("Role updated");
        }, (error) => this.notificationService.showErrorMessage(error));
    }
}
