import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import { AppConfig } from "./app.config";
import { MenuItemModel } from "./shared/components/menu-item.model";
import {AnalyticsService} from "./shared/services/analytics.service";
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
                       private readonly analyticsService: AnalyticsService,
                       private readonly router: Router,
                       public readonly authService: AuthService) {
        this.mobileQuery = media.matchMedia("(max-width: 600px)");
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                analyticsService.visitPage(event.urlAfterRedirects);
            }
        });

    }

}
