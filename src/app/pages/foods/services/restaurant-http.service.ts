import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { AppConfig } from "../../../app.config";
import { Address } from "../../../shared/models/person/address.model";
import { AbstractHttpService } from "../../../shared/services/abstract-http.service";
import { AuthService } from "../../../shared/services/auth.service";
import { GeoLocationService } from "../../../shared/services/geo-location.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { Restaurant } from "../models/restaurant.model";

const URL = AppConfig.BASE_URL + "/restaurants";

@Injectable()
export class RestaurantHttpService extends AbstractHttpService {
    private restaurants: Observable<{ [key: string]: { restaurant: Restaurant, distance: number } }> = this.loadRestaurants();

    public constructor(private readonly geoLocationService: GeoLocationService,
                       private readonly translateService: TranslateService,
                       http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public openFoodImages(text: string): void {
        window.open(this.getGoogleImagesLinkFor(text), "_blank");
    }

    public getDistance(coordinates: Address): string {
        const distance = this.geoLocationService.distanceFrom(coordinates);
        return this.geoLocationService.formatDistance(distance);
    }

    public getRestaurants(): Observable<Restaurant[]> {
        return this.restaurants.pipe(map((restaurants) => {
            return Object.values(restaurants)
                         .map((restaurant) => restaurant.restaurant);
        }));
    }

    public getWrappers(): Observable<{ restaurant: Restaurant, distance: number }[]> {
        return this.restaurants.pipe(map((restaurants) => Object.values(restaurants)));
    }

    public openHomepage(restaurant: Restaurant): void {
        window.open(restaurant.homepage, "__blank");
    }

    public getRestaurantByKey(key: string): Observable<Restaurant | null> {
        return this.restaurants.pipe(
            map((restaurants) => restaurants[key].restaurant),
            catchError(() => of(null))
        );
    }

    private getGoogleImagesLinkFor(dailyMenu: string): string {
        return `https://www.google.sk/search?q=${ encodeURIComponent(dailyMenu) }&tbm=isch`;
    }

    private loadRestaurants(): any {
        return this.geoLocationService.coordinates.pipe(switchMap((coordinates: Address) => {
            return this.http.get<{ restaurant: Restaurant, distance: number }[]>(`${ URL }/byDistance?latitude=${ coordinates.latitude }&longitude=${ coordinates.longitude }`)
                       .pipe(
                           catchError(this.handleError<{ restaurant: Restaurant, distance: number }[]>("getRestaurants")),
                           map((data: { restaurant: Restaurant, distance: number }[]) => {
                               const result: any = {};
                               data.filter((restaurant: { restaurant: Restaurant, distance: number }) => restaurant.restaurant.key)
                                   .forEach((restaurant) => {
                                       result[restaurant.restaurant.key as string] = restaurant;
                                   });

                               return result;
                           }));
        }));
    }
}
