import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { AppConfig } from "./app.config";
import { AuthService } from "./shared/services/auth.service";
import { MenuItemModel } from "./shared/components/menu-item.model";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnDestroy {
    public mobileQuery: MediaQueryList;
    public menuItems: MenuItemModel[] = AppConfig.MENU_ITEMS;
    public readonly title             = "Homepage-FE";
    public fillerContent              = ["content"];
    private _mobileQueryListener: () => void;

    public constructor(private readonly changeDetectorRef: ChangeDetectorRef,
                       private readonly media: MediaMatcher,
                       public readonly authService: AuthService) {
        this.mobileQuery = media.matchMedia("(max-width: 600px)");
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

    }
    public ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
