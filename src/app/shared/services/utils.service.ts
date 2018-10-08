import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppConfig } from "../../app.config";
import { AuthService } from "../auth.service";
import { AbstractHttpService } from "./abstract-http.service";
import { NotificationService } from "./notification.service";

const URL = AppConfig.BASE_URL + "/movies";

@Injectable()
export class UtilsService extends AbstractHttpService {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public getCountries(): Observable<string[]> {
        return this.http.get<string[]>(AppConfig.BASE_URL + "/utils/countries/list", {
            headers: this.getHeaders(),
        }).pipe(
            catchError(this.handleError<string[]>("getCountries")),
        );
    }

}
