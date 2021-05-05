import {MediaMatcher} from "@angular/cdk/layout";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer, Title} from "@angular/platform-browser";
import {NavigationEnd, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AppStaticConfig} from "./appStaticConfig";
import {AppConfig} from "./shared/app-config";
import {AnalyticsService} from "./shared/services/analytics.service";
import {AuthService} from "./shared/services/auth.service";
import {ConfigService} from "./shared/services/config.service";
import {IconService} from "./shared/services/icon.service";
import {MenuService} from "./shared/services/menu.service";

@Component({
    selector   : "app-root",
    templateUrl: "./app.component.html",
    styleUrls  : ["./app.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    public mobileQuery: MediaQueryList;
    public readonly startTemplates$ = this.menuService.startTemplates$;
    public readonly endTemplates$ = this.menuService.endTemplates$;
    public constructor(private readonly changeDetectorRef: ChangeDetectorRef,
                       private readonly media: MediaMatcher,
                       titleService: Title,
                       private readonly configService: ConfigService<AppConfig>,
                       private readonly translateService: TranslateService,
                       private readonly menuService: MenuService,
                       private readonly analyticsService: AnalyticsService,
                       private readonly router: Router,
                       public readonly authService: AuthService,
                       iconService: IconService,
                       matIconRegistry: MatIconRegistry,
                       domSanitizer: DomSanitizer) {
        this.translateService.use("sk");
        titleService.setTitle(this.configService.get("title"));
        this.mobileQuery = media.matchMedia("(max-width: 600px)");
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                analyticsService.visitPage(event.urlAfterRedirects);
            }
        });

        AppStaticConfig.FA_FOOD_ICONS.forEach((icon) => {
            matIconRegistry.addSvgIcon(icon, domSanitizer.bypassSecurityTrustResourceUrl("assets/images/foods/" + icon + ".svg"));
        });
        AppStaticConfig.FA_TECHNOLOGY_ICONS.forEach((icon) => {
            matIconRegistry.addSvgIcon(icon, domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_" + icon + ".svg"));
        });
        AppStaticConfig.FA_MOVIE_ICONS.forEach((icon) => {
            matIconRegistry.addSvgIcon(icon, domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_" + icon + ".svg"));
        });
    }

}
