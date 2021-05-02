import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { removeAccentedCharacters } from "gtools/GUtils";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { MapDialogComponent } from "../../../../shared/components/map-dialog/map-dialog.component";
import { MapsService } from "../../../../shared/services/maps.service";
import { DailyMenu } from "../../models/daily-menu.model";
import { Restaurant } from "../../models/restaurant.model";
import { DailyMenuHttpService } from "../../services/daily-menu-http.service";
import { RestaurantHttpService } from "../../services/restaurant-http.service";

@Component({
    selector   : "app-restaurant-row",
    templateUrl: "./restaurant-row.component.html",
    styleUrls  : ["./restaurant-row.component.scss"]
})
export class RestaurantRowComponent implements OnInit {
    public dailyMenu: DailyMenu | null;
    public restaurant?: Restaurant;
    public loading         = false;
    public restaurantMatch = false;
    public localSearchedMath: string;

    @Input()
    public set searchedFood(key: string) {
        this.localSearchedMath = key;
        this.restaurantMatch   = this.isRestaurantMatch();
        this.changeDetectorRef.markForCheck();
    }

    private isRestaurantMatch(): boolean {
        if (!this.restaurant || !this.localSearchedMath || this.localSearchedMath.length < 3) {
            return false;
        }
        const lowerSearch = removeAccentedCharacters(this.localSearchedMath.toLowerCase());

        return removeAccentedCharacters(this.restaurant.name)
                          .toLowerCase()
                          .indexOf(lowerSearch) >= 0 || removeAccentedCharacters(this.restaurant.key as any)
                                                                   .toLowerCase()
                                                                   .indexOf(lowerSearch) >= 0;
    }

    @Input()
    public set restaurantKey(key: string) {
        if (!key) {
            return;
        }
        this.loading = true;
        this.restaurantHttpService.getRestaurantByKey(key)
            .pipe(switchMap((data: Restaurant | null) => {
                if (data) {
                    this.restaurant = data;

                    return this.dailyMenuHttpService.getDailyMenuFor(key);
                }

                return of(null);

            }))
            .subscribe((dailyMenu: DailyMenu | null) => {
                this.dailyMenu = dailyMenu;
                this.loading   = false;
            });
    }

    public constructor(private readonly dailyMenuHttpService: DailyMenuHttpService,
                       private readonly restaurantHttpService: RestaurantHttpService,
                       private readonly changeDetectorRef: ChangeDetectorRef,
                       private readonly mapService: MapsService,
                       private readonly dialog: MatDialog) {
    }

    public ngOnInit(): void {
        // empty
    }

    public showMap(restaurant: Restaurant): void {
        if (!restaurant.address) {
            return;
        }
        this.dialog.open(MapDialogComponent, {
            width : "95%",
            height: "95%",
            data  : this.mapService.getLocationEmbedUrlFromLatAndLong(Number(restaurant.address.latitude), Number(restaurant.address.longitude))
        });
    }

    public getIconByType(type: string): string {
        switch (type) {
            case "pizza":
                return "local_pizza";
            case "burger":
                return "hamburger";
            case "fish":
                return "fish";
            case "salad":
                return "salad";
            default:
                return "restaurant";

        }
    }
}
