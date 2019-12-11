import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {AppConfig} from "../../../app.config";
import {AuthService} from "../../../shared/auth.service";
import {AbstractHttpService} from "../../../shared/services/abstract-http.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {DailyMenu} from "../../movies/models/daily-menu.model";

const URL = AppConfig.BASE_URL + "/menus/restaurant";

@Injectable()
export class DailyMenuHttpService extends AbstractHttpService<DailyMenu> {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public getDailyMenuFor(restaurantKey: string): Observable<DailyMenu> {
        return this.http.get<DailyMenu>(URL + "/" + restaurantKey);
    }

    public getAllDailyMenus(): Observable<DailyMenu[]> {
        return of([
            {
                restaurant: "Astra",
                dishes: [
                    {
                        name: "Francúzke ziamiaky",
                        price: 3.45,
                        weight: "120g"
                    },
                    {
                        name: "Grilovaný oštiepok",
                        price: 3.45,
                        weight: "120g"
                    }
                ]
            },
            {
                restaurant: "Delfín",
                dishes: [
                    {
                        name: "Bravčový rezeň",
                        price: 3.45,
                        weight: "120g"
                    },
                    {
                        name: "Hovedzý steak",
                        price: 3.45,
                        weight: "120g"
                    }
                ]
            }
        ]);
    }
}
