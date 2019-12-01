import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../modules/material.module";
import {SharedPipesModule} from "../pipes/shared-pipes.module";
import {AbstractTableComponent} from "./abstract-table/abstract-table.component";
import {AutoChipsComponent} from "./auto-chips/auto-chips.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {MapDialogComponent} from "./map-dialog/map-dialog.component";
import {PaginatorComponent} from "./paginator/paginator.component";
import {WidgetComponent} from "./widget/widget.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SharedPipesModule,
        ReactiveFormsModule,
    ],
    declarations: [
        PaginatorComponent,
        LoginScreenComponent,
        AbstractTableComponent,
        MapDialogComponent,
        WidgetComponent,
        AutoChipsComponent,
    ],
    entryComponents: [
        MapDialogComponent,
    ],
    exports: [
        PaginatorComponent,
        LoginScreenComponent,
        AbstractTableComponent,
        WidgetComponent,
        MapDialogComponent,
        AutoChipsComponent,
    ],
})
export class SharedComponentsModule {
}
