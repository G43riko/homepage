import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {AuthService} from "../../../shared/auth.service";
import {AbstractHttpService} from "../../../shared/services/abstract-http.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {DailyMenu} from "../../movies/models/daily-menu.model";

@Injectable()
export class DailyMenuHttpService extends AbstractHttpService<DailyMenu> {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
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
