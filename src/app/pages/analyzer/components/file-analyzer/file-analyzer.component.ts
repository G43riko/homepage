import { Component, OnInit, ViewChild } from "@angular/core";
import { FileAnalyzerPreviewComponent } from "../file-analyzer-preview/file-analyzer-preview.component";

@Component({
    selector: "app-file-analyzer",
    templateUrl: "./file-analyzer.component.html",
    styleUrls: ["./file-analyzer.component.scss"]
})
export class FileAnalyzerComponent implements OnInit {
    @ViewChild(FileAnalyzerPreviewComponent, {static: true}) private fileAnalyzerPreview: FileAnalyzerPreviewComponent;
    public uploaded = false;

    public ngOnInit(): void {
        // EMPTY
    }
}
