import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {AppConfig} from "../../../app.config";
import {AuthService} from "../../../shared/auth.service";
import {Address} from "../../../shared/models/person/address.model";
import {AbstractHttpService} from "../../../shared/services/abstract-http.service";
import {GeoLocationService} from "../../../shared/services/geo-location.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {Restaurant} from "../models/restaurant.model";

const URL = AppConfig.BASE_URL + "/restaurants";

@Injectable()
export class RestaurantHttpService extends AbstractHttpService {
    private restaurantList: Restaurant[];
    private readonly restaurantsByKey: { [key: string]: Restaurant } = {};

    public constructor(private readonly geoLocationService: GeoLocationService,
                       http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public openFoodImages(text: string): void {
        window.open(this.getGoogleImagesLinkFor(text), "_blank");
    }

    public getDistance(coordinates: Address): string {
        const distance = this.geoLocationService.distanceFrom(coordinates);
        if (!distance) {
            return "Vzialenosť";
        }

        if (distance < 1) {
            return (distance * 1000).toFixed(0) + " m ";
        }

        return distance.toFixed(2) + " km ";
    }

    public getRestaurants(): Observable<Restaurant[]> {
        const url = "https://g43riko.github.io/foods/assets/data/restaurantsData.json";

        return this.http.get<Restaurant[]>(url).pipe(
            tap((data) => this.setRestaurants(data)),
            catchError(this.handleError<Restaurant[]>("getRestaurants")),
        );
    }

    public openHomepage(restaurant: Restaurant): void {
        window.open(restaurant.homepage, "__blank");
    }

    public getRestaurantByKey(key: string): Restaurant {
        return this.restaurantsByKey[key];
    }

    private getGoogleImagesLinkFor(dailyMenu: string): string {
        return `https://www.google.sk/search?q=${encodeURIComponent(dailyMenu)}&tbm=isch`;
    }

    private setRestaurants(data: Restaurant[]): void {
        this.restaurantList = data;
        this.restaurantList.filter((restaurant) => restaurant.key).forEach((restaurant) => {
            this.restaurantsByKey[restaurant.key as string] = restaurant;
        });
    }
}
