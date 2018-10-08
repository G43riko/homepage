import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedComponentsModule } from "../../shared/components/shared-components.module";
import { SharedPipesModule } from "../../shared/pipes/shared-pipes.module";
import { AccountComponent } from "./components/account/account.component";
import { EmailComponent } from "./components/email/email.component";
import { PhoneComponent } from "./components/phone/phone.component";
import { PersonDetailComponent } from "./person-detail/person-detail.component";
import { PersonListComponent } from "./person-list/person-list.component";

@NgModule({
    imports: [
        CommonModule,
        SharedPipesModule,
        ReactiveFormsModule,
        SharedComponentsModule,
        FormsModule,
        RouterModule,
    ],
    declarations: [
        PersonListComponent,
        PersonDetailComponent,
        EmailComponent,
        PhoneComponent,
        AccountComponent,
    ],
})
export class PersonModule {
}
