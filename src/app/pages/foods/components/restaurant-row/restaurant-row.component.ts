import {Component, Input, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {MapDialogComponent} from "../../../../shared/components/map-dialog/map-dialog.component";
import {MapsService} from "../../../../shared/services/maps.service";
import {DailyMenu} from "../../../movies/models/daily-menu.model";
import {Restaurant} from "../../models/restaurant.model";
import {DailyMenuHttpService} from "../../services/daily-menu-http.service";
import {RestaurantHttpService} from "../../services/restaurant-http.service";

@Component({
    selector: "app-restaurant-row",
    templateUrl: "./restaurant-row.component.html",
    styleUrls: ["./restaurant-row.component.scss"]
})
export class RestaurantRowComponent implements OnInit {
    public dailyMenu: DailyMenu;
    @Input() public restaurantKey: string;
    public restaurant?: Restaurant;

    public constructor(private readonly dailyMenuHttpService: DailyMenuHttpService,
                       private readonly restaurantHttpService: RestaurantHttpService,
                       private readonly mapService: MapsService,
                       private readonly dialog: MatDialog) {
    }

    public ngOnInit(): void {
        if (!this.restaurantKey) {
            return;
        }
        this.restaurant = this.restaurantHttpService.getRestaurantByKey(this.restaurantKey);
        this.dailyMenuHttpService.getDailyMenuFor(this.restaurantKey).subscribe((dailyMenu) => {
            this.dailyMenu = dailyMenu;
        });
    }

    public showMap(restaurant: Restaurant): void {
        if (!restaurant.address) {
            return;
        }
        this.dialog.open(MapDialogComponent, {
            width: "95%",
            height: "95%",
            data: this.mapService.getLocationEmbedUrlFromLatAndLong(Number(restaurant.address.latitude), Number(restaurant.address.longitude)),
        });
    }

    public getIconByType(type: string): string {
        switch (type) {
            case "pizza":
                return "local_pizza";
            default:
                return "restaurant";

        }
    }
}
