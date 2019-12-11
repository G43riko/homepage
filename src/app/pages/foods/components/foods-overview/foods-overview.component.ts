import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../../shared/services/auth.service";
import {DailyMenu} from "../../../movies/models/daily-menu.model";
import {DailyMenuHttpService} from "../../services/daily-menu-http.service";

@Component({
    selector: "app-overview",
    templateUrl: "./foods-overview.component.html",
    styleUrls: ["./foods-overview.component.scss"],
})
export class FoodsOverviewComponent implements OnInit {
    public dailyMenus: DailyMenu[];
    public selectedRestaurants: string[];

    public constructor(private readonly dailyMenuHttpService: DailyMenuHttpService,
                       private readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        this.dailyMenuHttpService.getAllDailyMenus().subscribe((dailyMenus) => {
            this.dailyMenus = dailyMenus;
        });

        this.authService.user$.subscribe((user) => {
            if (user) {
                this.selectedRestaurants = user.favoriteRestaurants || [];
            }
        });
    }

}
