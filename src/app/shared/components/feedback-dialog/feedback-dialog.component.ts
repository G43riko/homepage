import {Component, Inject} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import { FeedbackHttpService } from "../../services/feedback-http.service";
import { NotificationService } from "../../services/notification.service";

@Component({
    selector: "app-feedback-dialog",
    templateUrl: "./feedback-dialog.component.html",
    styleUrls: ["./feedback-dialog.component.scss"]
})
export class FeedbackDialogComponent {
    public readonly feedbackForm = this.createForm();

    public constructor(public readonly bottomSheetRef: MatBottomSheetRef<FeedbackDialogComponent>,
                       private readonly feedbackHttpService: FeedbackHttpService,
                       private readonly notificationService: NotificationService,
                       @Inject(MAT_BOTTOM_SHEET_DATA) private readonly data: { screen?: string } = {},
                       private readonly formBuilder: FormBuilder) {
    }


    public submit(): void {
        this.feedbackForm.disable();
        this.feedbackHttpService.sendFeedback(this.feedbackForm.value).subscribe((response: any) => {
            this.bottomSheetRef.dismiss();
            this.feedbackForm.enable();
            this.feedbackForm.reset();
        }, (error) => {
            this.notificationService.openErrorNotification(error);
            this.feedbackForm.enable();
        });
    }

    private createForm(): FormGroup {
        return this.formBuilder.group({
            screen: [{
                value: this.data.screen,
                disabled: true
            }],
            message: ["", Validators.required]
        });
    }
}
