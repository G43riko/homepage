import { Component, ElementRef, ViewChild } from "@angular/core";
import { TextHighlightService } from "../text-highlight.service";

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

    result.push({key: "Name", value: response.originalName});
    result.push({key: "Size", value: response.size + " bytes"});
    result.push({key: "MimeType", value: response.extensionByMimeType});
    result.push({key: "Encoding", value: response.encoding});
    result.push({key: "Preview type", value: response.previewType});

    return result;
}

@Component({
    selector: "app-file-analyzer-preview",
    templateUrl: "./file-analyzer-preview.component.html",
    styleUrls: ["./file-analyzer-preview.component.scss"]
})
export class FileAnalyzerPreviewComponent {
    @ViewChild("previewBody", {static: true}) public readonly previewBody: ElementRef<HTMLElement>;
    private uploadedFile: File;
    public response: Response;
    public readonly infos: { key: string, value?: string | number, type?: "divider" }[] = [];

    public constructor(public readonly textHighlightService: TextHighlightService) {

    }

    public processServerResponse(response: Response, uploadedFile: File): void {
        this.response = response;
        this.uploadedFile = uploadedFile;
        this.infos.push(...getInfos(this.response));
        this.showPreview(this.response.previewType, this.uploadedFile);
    }

    private showPreview(previewType: string, uploadedFile: File): void {
        const reader = new FileReader();
        switch (previewType) {
            case "image":
                const src = URL.createObjectURL(uploadedFile);
                const image = document.createElement("image") as HTMLImageElement;
                image.onload = () => {
                    this.infos.push({key: "Image data", type: "divider"});
                    this.infos.push({key: "Width", value: image.width + " px"});
                    this.infos.push({key: "Height", value: image.height + " px"});
                };
                image.src = src;
                this.previewBody.nativeElement.style.background = `url("${ src }")`;
                this.previewBody.nativeElement.style.backgroundRepeat = "no-repeat";
                this.previewBody.nativeElement.style.backgroundSize = "contain";
                this.previewBody.nativeElement.style.backgroundPosition = "center center";

                break;
            case "html":
                reader.onload = () => {
                    this.previewBody.nativeElement.style.padding = "1rem";
                    this.previewBody.nativeElement.attachShadow({mode: "open"}).innerHTML = reader.result as string;
                    this.showContentData(this.response.contentData);
                };
                reader.readAsText(uploadedFile);
                break;
            case "pdf":
                const result = document.createElement("object");
                result.data = URL.createObjectURL(uploadedFile);
                result.style.width = "100%";
                result.style.height = "100%";
                this.previewBody.nativeElement.append(result);
                break;
            case "svg":
                reader.onload = () => {
                    const wrapper = document.createElement("div");
                    wrapper.innerHTML = reader.result as string;
                    wrapper.style.stroke = "black";
                    wrapper.style.fill = "blue";
                    this.showContentData(this.response.contentData);
                    this.previewBody.nativeElement.append(wrapper);
                };
                reader.readAsText(uploadedFile);
                break;
            case "audio":
                const audio = document.createElement("audio");
                audio.src = URL.createObjectURL(uploadedFile);
                audio.style.width = "100%";
                audio.controls = true;
                this.previewBody.nativeElement.append(audio);

                audio.onloadeddata = () => {
                    this.infos.push({key: "Audio data", type: "divider"});
                    this.infos.push({key: "Duration", value: audio.duration + " s"});
                    this.infos.push({key: "Text tracks", value: audio.textTracks && audio.textTracks.length || 0});
                    this.infos.push({key: "Audio tracks", value: audio.audioTracks && audio.audioTracks.length || 0});
                };
                break;
            case "video":
                const video = document.createElement("video");
                video.src = URL.createObjectURL(uploadedFile);
                video.style.width = "100%";
                video.style.height = "100%";
                video.controls = true;
                this.previewBody.nativeElement.append(video);

                video.onloadeddata = () => {
                    this.infos.push({key: "Video data", type: "divider"});
                    this.infos.push({key: "Width", value: video.videoWidth + " px"});
                    this.infos.push({key: "Height", value: video.videoHeight + " px"});
                    this.infos.push({key: "Duration", value: video.duration + " s"});
                    this.infos.push({key: "Text tracks", value: video.textTracks && video.textTracks.length || 0});
                    this.infos.push({key: "Video tracks", value: video.videoTracks && video.videoTracks.length || 0});
                    this.infos.push({key: "Audio tracks", value: video.audioTracks && video.audioTracks.length || 0});
                };
                break;
            case "json":
                reader.onload = () => {
                    this.previewBody.nativeElement.style.padding = "1rem";
                    this.previewBody.nativeElement.innerHTML = `<pre>${ JSON.stringify(JSON.parse(reader.result as string), null, 4) }</pre>`;
                    this.showContentData(this.response.contentData);
                };
                reader.readAsText(uploadedFile);
                break;
            case "formatted":
                reader.onload = () => {
                    this.previewBody.nativeElement.style.padding = "1rem";
                    this.previewBody.nativeElement.innerHTML = `<pre>${ reader.result }</pre>`;
                    this.showContentData(this.response.contentData);
                };
                reader.readAsText(uploadedFile);
                break;
            case "highlight":
                reader.onload = () => {
                    this.previewBody.nativeElement.style.padding = "1rem";
                    this.previewBody.nativeElement.innerHTML = this.textHighlightService.highlight(reader.result as string, this.response.highlight as string).replace(/(\r\n|\n|\r)/gm, () => "<br/>");
                    this.showContentData(this.response.contentData, this.previewBody.nativeElement);
                };
                reader.readAsText(uploadedFile);
                break;
            default:
                reader.onload = () => {
                    this.previewBody.nativeElement.style.padding = "1rem";
                    this.previewBody.nativeElement.innerText = reader.result as string;
                };
                reader.readAsText(uploadedFile);
        }
    }

    private showContentData(data: Response["contentData"], parentElement?: HTMLElement): void {
        if (!data) {
            return;
        }
        this.infos.push({key: "Content data", type: "divider"});
        this.infos.push({key: "Rows", value: data.rows || 0});
        this.infos.push({key: "Empty rows", value: data.emptyRows || 0});
        if (parentElement) {
            this.infos.push({key: "Comments", value: this.previewBody.nativeElement.querySelectorAll(".comment").length});
        }
    }
}
