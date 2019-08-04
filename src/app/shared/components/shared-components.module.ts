import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../modules/material.module";
import {SharedPipesModule} from "../pipes/shared-pipes.module";
import { AbstractTableComponent } from "./abstract-table/abstract-table.component";
import { AlertComponent } from "./alert/alert.component";
import { LoginScreenComponent } from "./login-screen/login-screen.component";
import { MapDialogComponent } from "./map-dialog/map-dialog.component";
import { NotificationComponent } from "./notification/notification.component";
import { PaginatorComponent } from "./paginator/paginator.component";
import { ProfileComponent } from "./profile-component/profile.component";
import { SideBarComponent } from "./side-bar/side-bar.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SharedPipesModule,
    ],
    declarations: [
        AlertComponent,
        ProfileComponent,
        SideBarComponent,
        AlertComponent,
        NotificationComponent,
        PaginatorComponent,
        LoginScreenComponent,
        AbstractTableComponent,
        MapDialogComponent,
    ],
    entryComponents: [
        MapDialogComponent,
    ],
    exports: [
        AlertComponent,
        SideBarComponent,
        ProfileComponent,
        AlertComponent,
        NotificationComponent,
        PaginatorComponent,
        LoginScreenComponent,
        AbstractTableComponent,
        MapDialogComponent,
    ],
})
export class SharedComponentsModule {
}
