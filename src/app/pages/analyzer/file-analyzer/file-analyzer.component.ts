import { Component, OnInit, ViewChild } from "@angular/core";
import { FileAnalyzerPreviewComponent } from "../file-analyzer-preview/file-analyzer-preview.component";

@Component({
    selector: "app-file-analyzer",
    templateUrl: "./file-analyzer.component.html",
    styleUrls: ["./file-analyzer.component.scss"]
})
export class FileAnalyzerComponent implements OnInit {
    @ViewChild(FileAnalyzerPreviewComponent, {static: false}) private readonly fileAnalyzerPreview: FileAnalyzerPreviewComponent;
    public uploaded = false;

    public ngOnInit(): void {
    }

    public processResponse(responseObject: {response: any, file: File}): void {
        console.log("Receivujeme");
        this.fileAnalyzerPreview.processResponse(responseObject.response, responseObject.file);
    }

}
