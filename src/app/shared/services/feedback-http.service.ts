import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { AppStaticConfig } from "../../appStaticConfig";
import { User } from "../models/auth.model";
import { AbstractHttpService } from "./abstract-http.service";
import { AuthService } from "./auth.service";
import { NotificationService } from "./notification.service";

const URL = AppStaticConfig.BASE_URL + "/feedback";

@Injectable({
  providedIn: "root"
})
export class FeedbackHttpService extends AbstractHttpService {
    public constructor(http: HttpClient, private readonly authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public sendFeedback(feedback: {screen: string, message: string}): Observable<any> {
        return this.authService.user$.pipe(
            switchMap((user: User | undefined) => {
                return this.http.post(URL, {...feedback, user: user ? user.uid: undefined});
            }),
            take(1),
        );
    }
}
