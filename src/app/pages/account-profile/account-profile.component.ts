import {ChangeDetectionStrategy, Component} from "@angular/core";
import {of} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector   : "app-account-profile",
    templateUrl: "./account-profile.component.html",
    styleUrls: ["./account-profile.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountProfileComponent {
    public readonly languages$ = of(["sk", "en"]);
    public readonly currentLanguage$ = of(this.translateService.currentLang);
    public constructor(
        private readonly translateService: TranslateService
    ) {
    }

    public onLanguageChange(language: string): void {
        console.error("SETTING LANGUAGE", language);
        this.translateService.use(language);
    }
}
