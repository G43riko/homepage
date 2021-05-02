import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppStaticConfig } from "../../appStaticConfig";
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
        const url = `${AppStaticConfig.YOUTUBE_API_URL}search`;

        return this.http.get<any>(url, {
            params: {
                q   : key,
                part: "snippet",
                key : AppStaticConfig.YOUTUBE_API_KEY
            }
        })
                   .pipe(
                       catchError(this.handleError<Person[]>("getPersons"))
                   );
    }
}
