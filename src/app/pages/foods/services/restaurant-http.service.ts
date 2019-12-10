import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {AppConfig} from "../../../app.config";
import {AuthService} from "../../../shared/auth.service";
import {AbstractHttpService} from "../../../shared/services/abstract-http.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {Restaurant} from "../models/restaurant.model";

const URL = AppConfig.BASE_URL + "/restaurants";

@Injectable()
export class RestaurantHttpService extends AbstractHttpService {

    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public getRestaurants(): Observable<Restaurant[]> {
        const url = "https://g43riko.github.io/foods/assets/data/restaurantsData.json"; // URL + "?source=github";

        return this.http.get<Restaurant[]>(url).pipe(
            catchError(this.handleError<Restaurant[]>("getRestaurants")),
        );
    }
}
