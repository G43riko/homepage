import { Component, OnInit, ViewChild } from "@angular/core";
import { FileAnalyzerPreviewComponent } from "../file-analyzer-preview/file-analyzer-preview.component";

@Component({
    selector: "app-file-analyzer",
    templateUrl: "./file-analyzer.component.html",
    styleUrls: ["./file-analyzer.component.scss"]
})
export class FileAnalyzerComponent implements OnInit {
    @ViewChild(FileAnalyzerPreviewComponent, {static: true}) private fileAnalyzerPreview: FileAnalyzerPreviewComponent;
    public uploadDisplay = "flex";
    public previewDisplay = "none";
    public set uploaded(value: boolean) {
        if (value) {
            this.uploadDisplay = "none";
            this.previewDisplay = "flex";
        }
        else {
            this.uploadDisplay = "flex";
            this.previewDisplay = "none";
        }
    }

    public ngOnInit(): void {
        // EMPTY
    }
}
