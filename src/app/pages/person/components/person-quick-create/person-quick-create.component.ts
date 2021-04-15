import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NotificationService } from "../../../../shared/services/notification.service";
import { PersonHttpService } from "../../services/person-http.service";

@Component({
    selector   : "app-person-quick-create",
    templateUrl: "./person-quick-create.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls  : ["./person-quick-create.component.scss"]
})
export class PersonQuickCreateComponent {
    public readonly createForm = this.formBuilder.group({
        phone    : "",
        rawName  : "",
        surName  : "",
        gender  : "",
        name     : "",
        birthday: "",
        email    : "",
        splitName: false,
    });

    public constructor(
        private readonly personHttpService: PersonHttpService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly notificationService: NotificationService,
    ) {
    }

    private getName(value: any): string[] {
        const trimmedSurName = value.surName?.trim();
        const trimmedName    = value.name?.trim();
        if (trimmedSurName && trimmedName) {
            return [trimmedName, trimmedSurName];
        }

        const trimmedRawName = value.rawName?.trim();
        if (!trimmedRawName) {
            this.notificationService.openErrorNotification("Name is not valid");
            throw new Error("Name is not valid");
        }

        return trimmedRawName.split(" ");
    }

    public onPersonCreateClick(): void {
        const value = this.createForm.value;

        this.personHttpService.quickCreate({
            phoneNumber: value.phone,
            email: value.email,
            gender: value.gender,
            birthday: value.birthday,
            name: this.getName(value),
        }).subscribe(() => {
            this.notificationService.openSuccessNotification("Person created");
            this.router.navigateByUrl("/persons");
        }, (error) => this.notificationService.openErrorNotification("Error during creation " + error));
    }

    public onBackClick(): void {
        this.router.navigateByUrl("/persons");
    }
}
