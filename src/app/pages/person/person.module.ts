import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { AccountComponent } from "./components/account/account.component";
import { ContactComponent } from "./components/contact/contact.component";
import { EmailComponent } from "./components/email/email.component";
import { NumberComponent } from "./components/number/number.component";
import { PhoneComponent } from "./components/phone/phone.component";
import { PersonDetailComponent } from "./person-detail/person-detail.component";
import { PersonListComponent } from "./person-list/person-list.component";

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        PersonListComponent,
        PersonDetailComponent,
        ContactComponent,
        PhoneComponent,
        AccountComponent,
        NumberComponent,
        EmailComponent,
    ],
})
export class PersonModule {
}
