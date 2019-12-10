import {Component, Input, OnInit} from "@angular/core";
import {DailyMenu} from "../../../movies/models/daily-menu.model";

@Component({
    selector: "app-restaurant-row",
    templateUrl: "./restaurant-row.component.html",
    styleUrls: ["./restaurant-row.component.scss"]
})
export class RestaurantRowComponent implements OnInit {
    @Input() public dailyMenu: DailyMenu;

    public constructor() {
    }

    public ngOnInit(): void {
    }

}
