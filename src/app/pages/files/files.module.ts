import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FileListComponent } from "./file-list/file-list.component";
import { FilesRoutingModule } from "./files-routes.module";
import { FileUploadComponent } from "./file-upload/file-upload.component";

@NgModule({
    declarations: [FileListComponent, FileUploadComponent],
    imports: [
        FilesRoutingModule,
        CommonModule,
    ],
})
export class FilesModule {
}
