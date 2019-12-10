import {Component, OnInit} from "@angular/core";
import {DailyMenu} from "../../../movies/models/daily-menu.model";
import {DailyMenuHttpService} from "../../services/daily-menu-http.service";

@Component({
    selector: "app-overview",
    templateUrl: "./foods-overview.component.html",
    styleUrls: ["./foods-overview.component.scss"],
})
export class FoodsOverviewComponent implements OnInit {
    public dailyMenus: DailyMenu[];

    public constructor(private readonly dailyMenuHttpService: DailyMenuHttpService) {
    }

    public ngOnInit(): void {
        this.dailyMenuHttpService.getAllDailyMenus().subscribe((dailyMenus) => {
            this.dailyMenus = dailyMenus;
        });
    }

}
