import { ChangeDetectionStrategy, Component } from "@angular/core";
import { combineLatest, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { AppStaticConfig } from "../../../appStaticConfig";
import { AuthService } from "../../services/auth.service";
import { MenuItemModel } from "../menu-item.model";

@Component({
    selector   : "app-side-menu",
    templateUrl: "./side-menu.component.html",
    styleUrls  : ["./side-menu.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
    public readonly menuItems$: Observable<MenuItemModel[]> = combineLatest([
        of(AppStaticConfig.MENU_ITEMS),
        this.authService.user$,
    ]).pipe(
        map(([menuItems, user]) =>
            menuItems.filter((menuItem) => !menuItem.access || (user && this.authService.canShowMenuItem(user, menuItem.access))),
        )
    );

    public constructor(private readonly authService: AuthService) {}
}
