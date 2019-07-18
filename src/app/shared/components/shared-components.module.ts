import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AlertComponent } from "./alert/alert.component";
import { NotificationComponent } from "./notification/notification.component";
import { PaginatorComponent } from "./paginator/paginator.component";
import { ProfileComponent } from "./profile-component/profile.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { TopMenuComponent } from "./top-menu/top-menu.component";
import { LoginScreenComponent } from "./login-screen/login-screen.component";
import { MaterialModule } from "../modules/material.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
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
        LoginScreenComponent,
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
        LoginScreenComponent,
    ],
})
export class SharedComponentsModule {
}
