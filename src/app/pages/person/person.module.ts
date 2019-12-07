import {NgModule} from "@angular/core";
import {CoreModule} from "../../shared/core.module";
import {SharedModule} from "../../shared/shared.module";
import {AccountComponent} from "./components/account/account.component";
import {EmailComponent} from "./components/email/email.component";
import {NumberComponent} from "./components/number/number.component";
import {PersonDetailComponent} from "./components/person-detail/person-detail.component";
import {PersonListRowCellAccountComponent} from "./components/person-list-row-cell-account/person-list-row-cell-account.component";
import {PersonListRowCellSelectComponent} from "./components/person-list-row-cell-select/person-list-row-cell-select.component";
import {PersonListRowComponent} from "./components/person-list-row/person-list-row.component";
import {PersonListComponent} from "./components/person-list/person-list.component";
import {PersonHttpService} from "./person-http.service";
import {PersonRoutingModule} from "./person-routes.module";

@NgModule({
    imports: [
        CoreModule,
        PersonRoutingModule,
        SharedModule,
    ],
    providers: [
        PersonHttpService,
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
