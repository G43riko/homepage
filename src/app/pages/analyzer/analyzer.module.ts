import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../shared/modules/material.module";
import { SharedModule } from "../../shared/shared.module";
import { AnalyzerRoutingModule } from "./analyzer-routes.module";
import { FileAnalyzerPreviewComponent } from "./components/file-analyzer-preview/file-analyzer-preview.component";
import { FileAnalyzerUploadComponent } from "./components/file-analyzer-upload/file-analyzer-upload.component";
import { FileAnalyzerComponent } from "./components/file-analyzer/file-analyzer.component";

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
