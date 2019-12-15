import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { FeedbackDialogComponent } from "../../../../shared/components/feedback-dialog/feedback-dialog.component";
import { AuthService } from "../../../../shared/services/auth.service";
import { DailyMenuHttpService } from "../../services/daily-menu-http.service";

@Component({
    selector   : "app-overview",
    templateUrl: "./foods-overview.component.html",
    styleUrls  : ["./foods-overview.component.scss"],
})
export class FoodsOverviewComponent implements OnInit {
    public selectedRestaurants: string[];

    public constructor(private readonly dailyMenuHttpService: DailyMenuHttpService,
                       private readonly bottomSheet: MatBottomSheet,
                       private readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            if (user) {
                this.selectedRestaurants = user.favoriteRestaurants || [];
            }
        });
    }

    public openFeedback(): void {
        this.bottomSheet.open(FeedbackDialogComponent, {data: {screen: "Foods"}});
    }
}
