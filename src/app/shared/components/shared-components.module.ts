import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "../../app-routing.module";
import { AccountsService } from "../services/accounts.service";
import { AlertComponent } from "./alert/alert.component";
import { NotificationComponent } from "./notification/notification.component";
import { PaginatorComponent } from "./paginator/paginator.component";
import { ProfileComponent } from "./profile-component/profile.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { TopMenuComponent } from "./top-menu/top-menu.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
    ],
    declarations: [
        AlertComponent,
        SearchBarComponent,
        ProfileComponent,
        SideBarComponent,
        AlertComponent,
        NotificationComponent,
        TopMenuComponent,
        PaginatorComponent,
    ],
    exports: [
        AlertComponent,
        SearchBarComponent,
        SideBarComponent,
        ProfileComponent,
        AlertComponent,
        NotificationComponent,
        TopMenuComponent,
        PaginatorComponent,
    ],
    providers: [
        AccountsService,
    ],
})
export class SharedComponentsModule {
}
