import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth.service";
import { UserAccount } from "../../models/user-account.model";
import { AccountsService } from "../../services/accounts.service";
import { NotificationService } from "../../services/notification.service";

declare let $: any;

@Component({
    selector: "profile-component",
    templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
    public state: "logIn" | "signup" | "loggedIn" = "logIn";

    public userAccount: UserAccount = new UserAccount();

    public constructor(private readonly accountService: AccountsService,
                       private readonly authService: AuthService,
                       private readonly notificationService: NotificationService) {
        if (authService.loggedIn) {
            this.state       = "loggedIn";
            this.userAccount = accountService.getLoggedUser();
        }
    }

    public ngOnInit(): void {

    }

    public logOut(): void {
        this.state = "logIn";
        this.authService.logOut();
        this.userAccount = new UserAccount();
    }

    public signUp(): void {
        this.accountService.signUp(this.userAccount.login,
            this.userAccount.password,
            this.userAccount.email).subscribe(() => {
            this.state = "logIn";
        }, (error) => this.notificationService.showErrorMessage(error));
    }

    public logIn(): void {
        this.accountService.logIn(this.userAccount.login, this.userAccount.password).subscribe((account) => {
            this.userAccount = account;
            this.state       = "loggedIn";
        }, (error) => this.notificationService.showErrorMessage(error));
    }
}
