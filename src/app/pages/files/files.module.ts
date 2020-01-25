import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedDirectivesModule} from "../../shared/directives/shared-directives.module";
import {MaterialModule} from "../../shared/modules/material.module";
import {SharedPipesModule} from "../../shared/pipes/shared-pipes.module";
import {FileListComponent} from "./file-list/file-list.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {FilesRoutingModule} from "./files-routes.module";
import {MyFilesComponent} from "./my-files/my-files.component";

@NgModule({
    declarations: [FileListComponent, FileUploadComponent, MyFilesComponent],
    imports: [
        SharedDirectivesModule,
        SharedPipesModule,
        MaterialModule,
        FilesRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class FilesModule {
}
