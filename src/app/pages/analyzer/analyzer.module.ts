import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../shared/modules/material.module";
import { SharedModule } from "../../shared/shared.module";
import { AnalyzerRoutingModule } from "./analyzer-routes.module";
import { FileAnalyzerPreviewComponent } from "./components/file-analyzer-preview/file-analyzer-preview.component";
import { FileAnalyzerUploadComponent } from "./components/file-analyzer-upload/file-analyzer-upload.component";
import { FileAnalyzerComponent } from "./components/file-analyzer/file-analyzer.component";
import { FileAudioProcessorService } from "./services/file-audio-processor.service";
import { FileImageProcessorService } from "./services/file-image-processor.service";
import { FileMapProcessorService } from "./services/file-map-processor.service";
import { FileTextProcessorService } from "./services/file-text-processor.service";
import { FileVideoProcessorService } from "./services/file-video-processor.service";
import { HistogramGeneratorService } from "./services/histogram-generator.service";
import { TextHighlightService } from "./services/text-highlight.service";

@NgModule({
    declarations: [
        FileAnalyzerComponent,
        FileAnalyzerUploadComponent,
        FileAnalyzerPreviewComponent,
    ],
    imports     : [
        SharedModule,
        MaterialModule,
        AnalyzerRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers   : [
        FileAudioProcessorService,
        FileImageProcessorService,
        FileMapProcessorService,
        FileTextProcessorService,
        FileVideoProcessorService,
        HistogramGeneratorService,
        TextHighlightService,
    ]
})
export class AnalyzerModule {
}
