import {Component, OnInit, ViewChild} from "@angular/core";
import {MatSelectionList} from "@angular/material/list";
import {Restaurant} from "../../models/restaurant.model";
import {RestaurantHttpService} from "../../services/restaurant-http.service";

@Component({
    selector: "app-restaurant-selector",
    templateUrl: "./restaurant-selector.component.html",
    styleUrls: ["./restaurant-selector.component.scss"]
})
export class RestaurantSelectorComponent implements OnInit {
    public changed = false;
    public loading = false;
    public allRestaurants: Restaurant[] = [];
    @ViewChild(MatSelectionList, {static: false}) private readonly selectionList: MatSelectionList;

    public constructor(private readonly restaurantHttpService: RestaurantHttpService) {
    }

    public ngOnInit(): void {
        this.loadData();
    }

    public reset(): void {
        if (!this.changed) {
            return;
        }
        this.selectionList.deselectAll();
        this.loadData();
        this.changed = false;
    }

    public isSelected(restaurant: Restaurant): boolean {
        return restaurant.name.toLowerCase().indexOf("a") >= 0;
    }

    public save(): void {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            this.changed = false;
        }, 1000);
    }

    private loadData(): void {
        this.restaurantHttpService.getRestaurants().subscribe((restaurants) => {
            this.allRestaurants = restaurants;
        });
    }
}
