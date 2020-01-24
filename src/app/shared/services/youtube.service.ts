import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MiscUtils } from "gtools";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppConfig } from "../../app.config";
import { Person } from "../models/person/person.model";
import { AbstractHttpService } from "./abstract-http.service";
import { AuthService } from "./auth.service";
import { NotificationService } from "./notification.service";

@Injectable()
export class YoutubeService extends AbstractHttpService {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public searchVideo(key: string): Observable<any> {
        const url = AppConfig.YOUTUBE_API_URL + "search" + MiscUtils.objectToQueryParams({
            q: key,
            part: "snippet",
            key: AppConfig.YOUTUBE_API_KEY,
        });

        return this.http.get<any>(url)
                   .pipe(
                       catchError(this.handleError<Person[]>("getPersons")),
                   );
    }
}
