import {Component, OnInit, ViewChild} from "@angular/core";
import {MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {User} from "../../../../shared/models/auth.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {Restaurant} from "../../models/restaurant.model";
import {RestaurantHttpService} from "../../services/restaurant-http.service";

@Component({
    selector: "app-restaurant-selector",
    templateUrl: "./restaurant-selector.component.html",
    styleUrls: ["./restaurant-selector.component.scss"]
})
export class RestaurantSelectorComponent implements OnInit {
    public loading = false;
    public allRestaurants: Restaurant[] = [];
    @ViewChild(MatSelectionList, {static: false}) private readonly selectionList: MatSelectionList;

    public constructor(private readonly restaurantHttpService: RestaurantHttpService,
                       public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        this.restaurantHttpService.getRestaurants().subscribe((restaurants) => {
            this.allRestaurants = restaurants;
        });
        this.authService.user$.subscribe((user) => {
            this.selectionList.deselectAll();
            if (user && Array.isArray(user.favoriteRestaurants)) {
                const favoriteRestaurants = user.favoriteRestaurants as string[];
                this.selectionList.selectedOptions.select(...this.selectionList.options.filter((e) => favoriteRestaurants.includes(e.value)));
            }
        });
    }

    public isSelected(restaurant: Restaurant, user: User): boolean {
        return Boolean(restaurant.key && Array.isArray(user.favoriteRestaurants) && user.favoriteRestaurants.includes(restaurant.key));
    }

    public change(event: MatSelectionListChange, user: User): void {
        this.loading = true;
        this.authService.updateFavouriteRestaurant(user, event.option.value, event.option.selected ? "add" : "remove").subscribe(() => {
            this.loading = false;
        });
    }
}
