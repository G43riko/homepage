import { Component, ViewChild } from "@angular/core";
import { FileAnalyzerPreviewComponent, Response } from "../file-analyzer-preview/file-analyzer-preview.component";

@Component({
    selector   : "app-file-analyzer",
    templateUrl: "./file-analyzer.component.html",
    styleUrls  : ["./file-analyzer.component.scss"],
})
export class FileAnalyzerComponent {
    @ViewChild(FileAnalyzerPreviewComponent, {static: true}) private fileAnalyzerPreview: FileAnalyzerPreviewComponent;
    public uploadDisplay  = "flex";
    public previewDisplay = "none";

    public set uploaded(value: boolean) {
        if (value) {
            this.uploadDisplay  = "none";
            this.previewDisplay = "flex";
        } else {
            this.uploadDisplay  = "flex";
            this.previewDisplay = "none";
        }
    }

    public onFileResponse(data: { response: Response, file: File }): void {
        this.uploaded = true;
        this.fileAnalyzerPreview.processServerResponse(data.response, data.file);
    }
}
