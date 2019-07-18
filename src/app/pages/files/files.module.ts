import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FileListComponent } from "./file-list/file-list.component";
import { FilesRoutingModule } from "./files-routes.module";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { MyFilesComponent } from "./my-files/my-files.component";
import { SharedDirectivesModule } from "../../shared/directives/shared-directives.module";
import { MaterialModule } from "../../shared/modules/material.module";
import { SharedPipesModule } from "../../shared/pipes/shared-pipes.module";

@NgModule({
    declarations: [FileListComponent, FileUploadComponent, MyFilesComponent],
    imports: [
        SharedDirectivesModule,
        SharedPipesModule,
        MaterialModule,
        FilesRoutingModule,
        CommonModule,
    ],
})
export class FilesModule {
}
