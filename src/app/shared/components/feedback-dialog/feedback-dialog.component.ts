import {Component, Inject} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";

@Component({
    selector: "app-feedback-dialog",
    templateUrl: "./feedback-dialog.component.html",
    styleUrls: ["./feedback-dialog.component.scss"]
})
export class FeedbackDialogComponent {
    public readonly feedbackForm = this.createForm();

    public constructor(public readonly bottomSheetRef: MatBottomSheetRef<FeedbackDialogComponent>,
                       @Inject(MAT_BOTTOM_SHEET_DATA) private readonly data: { screen?: string } = {},
                       private readonly formBuilder: FormBuilder) {
    }

    public submit(): void {
        this.bottomSheetRef.dismiss();
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
