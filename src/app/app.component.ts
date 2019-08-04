import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { AppConfig } from "./app.config";
import { MenuItemModel } from "./shared/components/menu-item.model";
import { AuthService } from "./shared/services/auth.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    public mobileQuery: MediaQueryList;
    public menuItems: MenuItemModel[] = AppConfig.MENU_ITEMS;
    public readonly title             = "Homepage-FE";

    public constructor(private readonly changeDetectorRef: ChangeDetectorRef,
                       private readonly media: MediaMatcher,
                       public readonly authService: AuthService) {
        this.mobileQuery = media.matchMedia("(max-width: 600px)");

    }

}
