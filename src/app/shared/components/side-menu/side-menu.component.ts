import { Component, OnInit } from "@angular/core";
import { AppStaticConfig } from "../../../appStaticConfig";
import { AuthService } from "../../services/auth.service";
import { MenuItemModel } from "../menu-item.model";

@Component({
    selector: "app-side-menu",
    templateUrl: "./side-menu.component.html",
    styleUrls: ["./side-menu.component.scss"]
})
export class SideMenuComponent implements OnInit {
    public menuItems: MenuItemModel[] = AppStaticConfig.MENU_ITEMS;

    public constructor(public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
    }

}
