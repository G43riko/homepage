import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSelectionList, MatSelectionListChange } from "@angular/material/list";
import { TranslateService } from "@ngx-translate/core";
import { switchMap } from "rxjs/operators";
import { User } from "../../../../shared/models/auth.model";
import { AuthService } from "../../../../shared/services/auth.service";
import { GeoLocationService } from "../../../../shared/services/geo-location.service";
import { Restaurant } from "../../models/restaurant.model";
import { RestaurantHttpService } from "../../services/restaurant-http.service";

@Component({
    selector: "app-restaurant-selector",
    templateUrl: "./restaurant-selector.component.html",
    styleUrls: ["./restaurant-selector.component.scss"]
})
export class RestaurantSelectorComponent implements OnInit {
    public loading = false;
    public allRestaurants: { restaurant: Restaurant, distance: number }[] = [];
    @ViewChild(MatSelectionList, {static: false}) private readonly selectionList: MatSelectionList;

    public constructor(private readonly geoLocationService: GeoLocationService,
                       private readonly restaurantHttpService: RestaurantHttpService,
                       private readonly translateService: TranslateService,
                       public readonly authService: AuthService) {
    }

    public getFormattedDistance(distance: number): string {
        if (!distance) {
            return this.translateService.instant("shared.unknownDistance");
        }

        return this.geoLocationService.formatDistance(distance);
    }

    public ngOnInit(): void {
        this.restaurantHttpService
            .getWrappers()
            .pipe(switchMap((restaurants: { restaurant: Restaurant, distance: number }[]) => {
                this.allRestaurants = restaurants;

                return this.authService.user$;
            }))
            .subscribe((user) => {
                this.selectionList.deselectAll();
                if (!(user && Array.isArray(user.favoriteRestaurants))) {
                    return;
                }
                const favoriteRestaurants = user.favoriteRestaurants;
                this.selectionList.selectedOptions.select(...this.selectionList.options.filter((e) => {
                    return favoriteRestaurants.includes(e.value);
                }));
            });
    }

    public isSelected(restaurant: Restaurant, user: User): boolean {
        return Boolean(restaurant.key && Array.isArray(user.favoriteRestaurants) && user.favoriteRestaurants.includes(restaurant.key));
    }

    public change(event: MatSelectionListChange, user: User): void {
        this.loading = true;
        this.authService.updateFavouriteRestaurant(user, event.option.value, event.option.selected ? "add" : "remove")
            .subscribe(() => {
                this.loading = false;
            });
    }
}
