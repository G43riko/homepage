import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MaterialModule} from "../modules/material.module";
import {SharedPipesModule} from "../pipes/shared-pipes.module";
import {AbstractTableComponent} from "./abstract-table/abstract-table.component";
import {AutoChipsComponent} from "./auto-chips/auto-chips.component";
import {FeedbackDialogComponent} from "./feedback-dialog/feedback-dialog.component";
import {IconListComponent} from "./icon-list/icon-list.component";
import {ImageDialogComponent} from "./image-dialog/image-dialog.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {MapDialogComponent} from "./map-dialog/map-dialog.component";
import {PaginatorComponent} from "./paginator/paginator.component";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {WidgetComponent} from "./widget/widget.component";
import {AbstractTableColumnTemplateDirective} from "./abstract-table/abstract-table-column-template.directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SharedPipesModule,
        RouterModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    declarations: [
        PaginatorComponent,
        LoginScreenComponent,
        AbstractTableComponent,
        AbstractTableColumnTemplateDirective,
        MapDialogComponent,
        WidgetComponent,
        AutoChipsComponent,
        ImageDialogComponent,
        FeedbackDialogComponent,
        IconListComponent,
        SideMenuComponent,
    ],
    entryComponents: [
        MapDialogComponent
    ],
    exports: [
        PaginatorComponent,
        LoginScreenComponent,
        AbstractTableComponent,
        AbstractTableColumnTemplateDirective,
        WidgetComponent,
        MapDialogComponent,
        AutoChipsComponent,
        ImageDialogComponent,
        FeedbackDialogComponent,
        IconListComponent,
        SideMenuComponent,
    ]
})
export class SharedComponentsModule {
}
