import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccountListComponent } from "./accont-list/account-list.component";
import { AccountsRoutingModule } from "./accounts-routes.module";
import { MaterialModule } from "../../shared/modules/material.module";

@NgModule({
    declarations: [AccountListComponent],
    imports: [
        MaterialModule,
        AccountsRoutingModule,
        CommonModule,
    ],
})
export class AccountsModule {
}
