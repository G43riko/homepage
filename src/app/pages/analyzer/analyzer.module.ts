import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../shared/modules/material.module";
import { SharedModule } from "../../shared/shared.module";
import { FileAnalyzerPreviewComponent } from "./file-analyzer-preview/file-analyzer-preview.component";
import { FileAnalyzerUploadComponent } from "./file-analyzer-upload/file-analyzer-upload.component";
import { FileAnalyzerComponent } from "./file-analyzer/file-analyzer.component";
import { AnalyzerRoutingModule } from "./analyzer-routes.module";

@NgModule({
    declarations: [
        FileAnalyzerComponent,
        FileAnalyzerUploadComponent,
        FileAnalyzerPreviewComponent,
    ],
    imports: [
        SharedModule,
        MaterialModule,
        AnalyzerRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AnalyzerModule {
}
