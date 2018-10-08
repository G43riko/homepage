import { Component, OnInit } from "@angular/core";
import { AppConfig } from "../../app.config";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
    public title: string = AppConfig.TITLE;

    public constructor() {
    }

    public ngOnInit(): void {
    }

}
