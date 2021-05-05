import {ChangeDetectionStrategy, Component} from "@angular/core";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: "app-login-screen",
    templateUrl: "./login-screen.component.html",
    styleUrls: ["./login-screen.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginScreenComponent {
    public readonly user$ = this.authService.user$;

    public constructor(private readonly authService: AuthService) {
    }

    public onSignOutClick(): void {
        this.authService.signOut();
    }

    public onGoogleSignInClick(): void {
        this.authService.googleSigning();
    }
}
