import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountListComponent } from "./accont-list/account-list.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: AccountListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountsRoutingModule {
}
