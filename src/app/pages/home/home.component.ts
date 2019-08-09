import { Component, OnInit } from "@angular/core";
import { AppConfig } from "../../app.config";
import {AnalyticsService} from "../../shared/services/analytics.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    public title: string = AppConfig.TITLE;

    public constructor(private readonly analyticsService: AnalyticsService) {
    }

    public ngOnInit(): void {
    }

    public gaEvent(): void {
        this.analyticsService.testEvent();
    }
}
