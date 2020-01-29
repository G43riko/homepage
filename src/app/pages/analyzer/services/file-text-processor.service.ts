import { Injectable } from "@angular/core";
import { FileProcessResult } from "./file-image-processor.service";
import { TextHighlightService } from "./text-highlight.service";

@Injectable({
    providedIn: "root"
})
export class FileTextProcessorService {
    public constructor(private readonly textHighlightService: TextHighlightService) {

    }

    public processRaw(uploadedFile: File): Promise<FileProcessResult> {
        const reader = new FileReader();

        return new Promise<FileProcessResult>((success, reject) => {
            reader.onload = () => success({previewContent: reader.result as string});
            reader.readAsText(uploadedFile);
        });
    }

    public processHighlightedText(uploadedFile: File, highlight: string): Promise<FileProcessResult> {
        const reader = new FileReader();

        return new Promise<FileProcessResult>((success, reject) => {
            reader.onload = () => {
                const result = this.textHighlightService
                                   .highlight(reader.result as string, highlight)
                                   .replace(/(\r\n|\n|\r)/gm, () => "<br/>");
                success({previewContent: result});
            };
            reader.readAsText(uploadedFile);
        });
    }

    public processJSON(uploadedFile: File): Promise<FileProcessResult> {
        const reader = new FileReader();

        return new Promise<FileProcessResult>((success, reject) => {
            reader.onload = () => {
                const result = document.createElement("pre");
                result.innerText = JSON.stringify(JSON.parse(reader.result as string), null, 4);
                result.style.padding = "1rem";
                success({previewContent: [result]});
            };
            reader.readAsText(uploadedFile);
        });
    }

    public async processHTML(uploadedFile: File): Promise<FileProcessResult> {
        const reader = new FileReader();

        return new Promise((success, reject) => {
            reader.onload = () => {
                const result = document.createElement("div");
                result.style.padding = "1rem";
                result.attachShadow({mode: "open"}).innerHTML = reader.result as string;
                success({previewContent: [result]});
            };
            reader.readAsText(uploadedFile);
        });
    }

    public async processPDF(uploadedFile: File): Promise<FileProcessResult> {
        const result = document.createElement("object");
        result.data = URL.createObjectURL(uploadedFile);
        result.style.width = "100%";
        result.style.height = "100%";

        return {previewContent: [result]};
    }
}
