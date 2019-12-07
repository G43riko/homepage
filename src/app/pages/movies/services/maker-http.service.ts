import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AppConfig} from "../../../app.config";
import {AuthService} from "../../../shared/auth.service";
import {AbstractHttpService} from "../../../shared/services/abstract-http.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {Maker} from "../models/maker.model";

const URL = AppConfig.BASE_URL + "/movies/maker";

@Injectable({
    providedIn: "root",
})
export class MakerHttpService extends AbstractHttpService<Maker> {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService, URL);
    }
}
