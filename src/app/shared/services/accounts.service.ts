import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppConfig } from "../../app.config";
import { AuthService } from "../auth.service";
import { Person } from "../models/person/person.model";
import { UserAccount } from "../models/user-account.model";
import { AbstractHttpService } from "./abstract-http.service";
import { NotificationService } from "./notification.service";

const URL = AppConfig.BASE_URL + "/accounts";

@Injectable()
export class AccountsService extends AbstractHttpService {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public logIn(login: string, password: string): Observable<UserAccount> {
        return this.http.post<UserAccount>(URL + "/authenticate", JSON.stringify({login, password}), {
            headers: this.getHeaders(),
        }).pipe(
            catchError(this.handleError<UserAccount>("log in")),
        );
    }

    public signUp(login: string, password: string, email: string): Observable<any> {
        return this.http.post<any>(URL + "/signUp", JSON.stringify({login, password, email}), {
            headers: this.getHeaders(),
        }).pipe(
            catchError(this.handleError<Person>("sign up")),
        );
    }

    public getLoggedUser(): UserAccount {
        return new UserAccount();
    }
}
