import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-login-screen",
    templateUrl: "./login-screen.component.html",
    styleUrls: ["./login-screen.component.scss"]
})
export class LoginScreenComponent implements OnInit {

    public constructor(public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
    }

}
