import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Email } from "../../../../shared/models/person/email.model";
import { Person } from "../../../../shared/models/person/person.model";
import { Phone } from "../../../../shared/models/person/phone.model";
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
        email    : "",
        splitName: false,
    });

    public constructor(
        private readonly personHttpService: PersonHttpService,
        private readonly formBuilder: FormBuilder,
        private readonly notificationService: NotificationService,
    ) {
    }


    private getName(value: any): { name: string, surName: string} | {nick: string} {
        const trimmedSurName = value.surName?.trim();
        const trimmedName    = value.name?.trim();
        if (trimmedSurName && trimmedName) {
            return {
                name   : trimmedName,
                surName: trimmedSurName,
            };
        }

        const trimmedRawName = value.rawName?.trim();
        if (!trimmedRawName) {
            this.notificationService.openErrorNotification("Name is not valid");
            throw new Error("Name is not valid");
        }

        const splitName = trimmedRawName.split(" ");

        if (splitName.length === 1) {
            return {
                nick: splitName[0].trim(),
            };
        }
        if (splitName.length === 2) {
            return {
                name   : splitName[0].trim(),
                surName: splitName[1].trim(),
            };
        }

        if (splitName.length === 3) {
            return {
                name      : splitName[0].trim(),
                nick: splitName[1].trim(),
                surName   : splitName[2].trim(),
            };
        }

        this.notificationService.openErrorNotification("Name is not valid");
        throw new Error("Name is not valid");
    }

    public onPersonCreateClick(): void {
        const value = this.createForm.value;

        const data = this.getName(value) as any;

        const numbers: Person["numbers"] = [];
        const emails: Person["emails"]   = [];

        if (value.phone) {
            numbers.push({
                active: true,
                number: value.number,
            } as Phone);
        }

        if (value.email) {
            emails.push({
                active: true,
                email : value.email,
            } as Email);
        }
        this.personHttpService.add({
            numbers,
            emails,
            gender: value.gender,
            nick: data.nick,
            name: data.name,
            surName: data.surName,
        } as Person).subscribe(() => {
            this.notificationService.openSuccessNotification("Person created");
        }, (error) => this.notificationService.openErrorNotification("Error during creation " + error));
    }

    public onBackClick(): void {
    }
}
