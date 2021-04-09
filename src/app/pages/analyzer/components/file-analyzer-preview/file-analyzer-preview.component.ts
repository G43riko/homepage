import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { FileAudioProcessorService } from "../../services/file-audio-processor.service";
import { FileImageProcessorService, FileProcessResult } from "../../services/file-image-processor.service";
import { FileMapProcessorService } from "../../services/file-map-processor.service";
import { FileTextProcessorService } from "../../services/file-text-processor.service";
import { FileVideoProcessorService } from "../../services/file-video-processor.service";

export interface Response {
    originalName: string;
    size: number;
    extensionByMimeType: string;
    encoding: string;
    highlight?: string;
    previewType: string;
    contentData?: {
        rows: number;
        emptyRows: number;
        attributes: any[];
        sourceType: any;
        parsedContent: any;
    };
}

function getInfos(response: Response): { key: string, value: string }[] {
    const result = [];

    result.push({key: "Size", value: response.size + " bytes"});
    result.push({key: "MimeType", value: response.extensionByMimeType});
    result.push({key: "Encoding", value: response.encoding});
    result.push({key: "Preview type", value: response.previewType});

    return result;
}

@Component({
    selector   : "app-file-analyzer-preview",
    templateUrl: "./file-analyzer-preview.component.html",
    styleUrls  : ["./file-analyzer-preview.component.scss"]
})
export class FileAnalyzerPreviewComponent {
    @Output() public readonly reset                                                     = new EventEmitter<void>();
    @ViewChild("previewBody", {static: true}) public readonly previewBody: ElementRef<HTMLElement>;
    @ViewChild("histograms", {static: true}) public readonly histograms: ElementRef<HTMLElement>;
    private uploadedFile: File;
    public response: Response;
    public readonly infos: { key: string, value?: string | number, type?: "divider" }[] = [];

    public constructor(private readonly audioProcessorService: FileAudioProcessorService,
                       private readonly textProcessorService: FileTextProcessorService,
                       private readonly mapProcessorService: FileMapProcessorService,
                       private readonly videoProcessorService: FileVideoProcessorService,
                       private readonly imageProcessorService: FileImageProcessorService) {

    }

    public resetPreview(): void {
        this.reset.next();
        this.previewBody.nativeElement.innerHTML = "";
        this.histograms.nativeElement.innerHTML  = "";
        this.infos.splice(0, this.infos.length);
        this.uploadedFile = null as any;
        this.response = null as any;
    }

    public processServerResponse(response: Response, uploadedFile: File): void {
        this.response     = response;
        this.uploadedFile = uploadedFile;
        this.infos.push(...getInfos(this.response));
        this.showPreview(this.response.previewType, this.uploadedFile);
    }

    private async showFileProcessResult(resultPromise: Promise<FileProcessResult>): Promise<void> {
        const result = await resultPromise;
        if (typeof result.previewContent === "string") {
            this.previewBody.nativeElement.style.padding = "1rem";
            this.previewBody.nativeElement.innerHTML     = result.previewContent;
        } else {
            this.previewBody.nativeElement.append(...result.previewContent);
        }

        if (typeof result.afterAddCallback === "function") {
            result.afterAddCallback();
        }

        if (Array.isArray(result.infos)) {
            this.infos.push(...result.infos);
        }
        if (Array.isArray(result.histograms)) {
            this.histograms.nativeElement.append(...result.histograms);
        }
    }

    private showPreview(previewType: string, uploadedFile: File): void {
        const reader = new FileReader();
        switch (previewType) {
            case "image":
                this.showFileProcessResult(this.imageProcessorService.processImage(uploadedFile));
                break;
            case "html":
                this.showFileProcessResult(this.textProcessorService.processHTML(uploadedFile)).then(() => {
                    this.showContentData(this.response.contentData);
                });
                break;
            case "map":
                this.showFileProcessResult(this.mapProcessorService.processMapFilePromise(uploadedFile));
                break;
            case "pdf":
                this.showFileProcessResult(this.textProcessorService.processPDF(uploadedFile));
                break;
            case "svg":
                this.showFileProcessResult(this.imageProcessorService.processSvg(uploadedFile)).then(() => {
                    this.showContentData(this.response.contentData);
                });
                break;
            case "audio":
                this.showFileProcessResult(this.audioProcessorService.processAudio(uploadedFile));
                break;
            case "video":
                this.showFileProcessResult(this.videoProcessorService.processVideo(uploadedFile));
                break;
            case "json":
                this.showFileProcessResult(this.textProcessorService.processJSON(uploadedFile)).then(() => {
                    this.showContentData(this.response.contentData, true);
                });
                break;
            case "formatted":
                reader.onload = () => {
                    this.previewBody.nativeElement.style.padding = "1rem";
                    this.previewBody.nativeElement.innerHTML     = `<pre>${reader.result}</pre>`;
                    this.showContentData(this.response.contentData);
                };
                reader.readAsText(uploadedFile);
                break;
            case "highlight":
                this.showFileProcessResult(this.textProcessorService.processHighlightedText(
                    uploadedFile,
                    this.response.highlight as string,
                )).then(() => {
                    this.showContentData(this.response.contentData, true);
                });
                break;
            default:
                this.showFileProcessResult(this.textProcessorService.processRaw(uploadedFile));
        }
    }

    private showContentData(data: Response["contentData"], checkCommentClasses = false): void {
        if (!data) {
            return;
        }
        this.infos.push({key: "Content data", type: "divider"});
        this.infos.push({key: "Rows", value: data.rows || 0});
        this.infos.push({key: "Empty rows", value: data.emptyRows || 0});
        if (checkCommentClasses) {
            this.infos.push({key: "Comments", value: this.previewBody.nativeElement.querySelectorAll(".comment").length});
        }
    }
}
