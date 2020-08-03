import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../shared/modules/material.module";
import { SharedModule } from "../../shared/shared.module";
import { FileListComponent } from "./file-list/file-list.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileUploadService } from "./file-upload/file-upload.service";
import { FilesRoutingModule } from "./files-routes.module";
import { MyFilesComponent } from "./my-files/my-files.component";

@NgModule({
    declarations: [
        FileListComponent,
        FileUploadComponent,
        MyFilesComponent,
    ],
    imports     : [
        SharedModule,
        MaterialModule,
        FilesRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers   : [
        FileUploadService,
    ]
})
export class FilesModule {
}
