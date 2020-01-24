import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppConfig } from "../../app.config";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    public title: string = AppConfig.TITLE;

    public constructor(public readonly router: Router) {
    }

    public ngOnInit(): void {
    }

    public gaEvent(): void {
    }
}
