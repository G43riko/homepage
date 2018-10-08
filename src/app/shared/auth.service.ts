import { Injectable } from "@angular/core";
import { AppConfig } from "../app.config";
import { UserAccount } from "./models/user-account.model";

@Injectable()
export class AuthService {
    private _token: string | null;

    public constructor() {
        this.checkIfIsLoggedIn();
    }

    private _loggedIn = false;

    public get loggedIn(): boolean {
        return this._loggedIn;
    }

    public logOut(): void {
        window.sessionStorage.removeItem(AppConfig.AUTH_COOKIE_KEY);
        this._loggedIn = false;
    }

    public logIn(data: UserAccount): UserAccount {
        this._token = data.token;

        if (!this._token) {
            throw new Error("Login options without token: " + JSON.stringify(data));
        }

        window.sessionStorage.setItem(AppConfig.AUTH_COOKIE_KEY, this._token);
        this._loggedIn = true;
        return data;
    }

    public getToken(): string {
        return this._token || "";
    }

    private checkIfIsLoggedIn(): void {
        this._token    = sessionStorage.getItem(AppConfig.AUTH_COOKIE_KEY);
        this._loggedIn = Boolean(this._token);
    }
}
