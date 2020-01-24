import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppConfig } from "../../../app.config";
import { AbstractHttpService } from "../../../shared/services/abstract-http.service";
import { AuthService } from "../../../shared/services/auth.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { Maker } from "../models/maker.model";

const URL = AppConfig.BASE_URL + "/external-movies";

@Injectable({
    providedIn: "root"
})
export class ExternalMovieService extends AbstractHttpService {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService, URL);
    }

    public getCsfdUserDetail(id: number, page = 1): Observable<any> {
        return this.http.get<Maker[]>(`${ URL }/user-movies/${ id }?page=${ page }`)
                   .pipe(
                       catchError(this.handleError<any>("getCsfdUserDetail")),
                   );
    }
}
