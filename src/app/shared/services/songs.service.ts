import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppConfig } from "../../app.config";
import { AuthService } from "../auth.service";
import { AbstractHttpService } from "./abstract-http.service";
import { NotificationService } from "./notification.service";

const URL = AppConfig.BASE_URL + "/songs";

@Injectable({
    providedIn: "root",
})
export class SongsService extends AbstractHttpService {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public getSongs(): Observable<any[]> {
        return this.http.get<any[]>(URL + "/list").pipe(
            catchError(this.handleError<any[]>("getSongs")),
        );
    }
}
