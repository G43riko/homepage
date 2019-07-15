import { Component, OnInit } from "@angular/core";
import { AppConfig } from "../../../app.config";

@Component({
    selector: "app-side-bar",
    templateUrl: "./side-bar.component.html",
    styleUrls: ["./side-bar.component.scss"],
})

export class SideBarComponent implements OnInit {
    public items: any[] = AppConfig.MENU_ITEMS;

    public ngOnInit(): void {
    }

}
