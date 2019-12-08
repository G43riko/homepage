import {MediaMatcher} from "@angular/cdk/layout";
import {ChangeDetectorRef, Component} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {NavigationEnd, Router} from "@angular/router";
import {AppConfig} from "./app.config";
import {MenuItemModel} from "./shared/components/menu-item.model";
import {AnalyticsService} from "./shared/services/analytics.service";
import {AuthService} from "./shared/services/auth.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    public mobileQuery: MediaQueryList;
    public menuItems: MenuItemModel[] = AppConfig.MENU_ITEMS;
    public readonly title = "Homepage-FE";

    public constructor(private readonly changeDetectorRef: ChangeDetectorRef,
                       private readonly media: MediaMatcher,
                       private readonly analyticsService: AnalyticsService,
                       private readonly router: Router,
                       public readonly authService: AuthService,
                       matIconRegistry: MatIconRegistry,
                       domSanitizer: DomSanitizer) {
        this.mobileQuery = media.matchMedia("(max-width: 600px)");
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                analyticsService.visitPage(event.urlAfterRedirects);
            }
        });

        matIconRegistry.addSvgIcon("imdb", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_imdb.svg"));
        matIconRegistry.addSvgIcon("csfd", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_csfd.svg"));
        matIconRegistry.addSvgIcon("facebook", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_facebook.svg"));
        matIconRegistry.addSvgIcon("github", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_github.svg"));
        matIconRegistry.addSvgIcon("instagram", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_instagram.svg"));
        matIconRegistry.addSvgIcon("linkedin", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_linkedin.svg"));
        matIconRegistry.addSvgIcon("mixcloud", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_mixcloud.svg"));
        matIconRegistry.addSvgIcon("twitter", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_twitter.svg"));
        matIconRegistry.addSvgIcon("youtube", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_youtube.svg"));
        matIconRegistry.addSvgIcon("movieDb", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_movieDb.svg"));
        matIconRegistry.addSvgIcon("codepen", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_codepen.svg"));
        matIconRegistry.addSvgIcon("gitlab", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_gitlab.svg"));
        matIconRegistry.addSvgIcon("npm", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_npm.svg"));
        matIconRegistry.addSvgIcon("hackerrank", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_hackerrank.svg"));
        matIconRegistry.addSvgIcon("skype", domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_skype.svg"));

    }

}
