import {NgModule} from "@angular/core";
import {CoreModule} from "../../shared/core.module";
import {SharedModule} from "../../shared/shared.module";
import {AccountComponent} from "./components/account/account.component";
import {EmailComponent} from "./components/email/email.component";
import {NumberComponent} from "./components/number/number.component";
import {PersonDetailComponent} from "./person-detail/person-detail.component";
import {PersonListRowCellAccountComponent} from "./person-list-row-cell-account/person-list-row-cell-account.component";
import {PersonListRowCellSelectComponent} from "./person-list-row-cell-select/person-list-row-cell-select.component";
import {PersonListRowComponent} from "./person-list-row/person-list-row.component";
import {PersonListComponent} from "./person-list/person-list.component";
import {PersonRoutingModule} from "./person-routes.module";
import {PersonService} from "./person.service";

@NgModule({
    imports: [
        CoreModule,
        PersonRoutingModule,
        SharedModule,
    ],
    providers: [
        PersonService,
    ],
    declarations: [
        PersonListComponent,
        PersonDetailComponent,
        AccountComponent,
        NumberComponent,
        EmailComponent,
        PersonListRowComponent,
        PersonListRowCellSelectComponent,
        PersonListRowCellAccountComponent,
    ],
})
export class PersonModule {
}
