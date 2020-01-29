import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { budget } from "@angular/fire/remote-config";
import { HistogramGeneratorService } from "../../services/histogram-generator.service";
import { TextHighlightService } from "../../services/text-highlight.service";

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
    selector: "app-file-analyzer-preview",
    templateUrl: "./file-analyzer-preview.component.html",
    styleUrls: ["./file-analyzer-preview.component.scss"]
})
export class FileAnalyzerPreviewComponent {
    @Output() public readonly reset = new EventEmitter<void>();
    @ViewChild("previewBody", {static: true}) public readonly previewBody: ElementRef<HTMLElement>;
    @ViewChild("histograms", {static: true}) public readonly histograms: ElementRef<HTMLElement>;
    private uploadedFile: File;
    public response: Response;
    public readonly infos: { key: string, value?: string | number, type?: "divider" }[] = [];
    public constructor(public readonly textHighlightService: TextHighlightService,
                       private readonly histogramGeneratorService: HistogramGeneratorService) {

    }

    public resetPreview(): void {
        this.reset.next();
        this.previewBody.nativeElement.innerHTML = "";
        this.histograms.nativeElement.innerHTML = "";
        this.infos.splice(0, this.infos.length);
        delete this.uploadedFile;
        delete this.response;
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
                const image = document.createElement("img") as HTMLImageElement;
                image.onload = () => {
                    this.infos.push({key: "Image data", type: "divider"});
                    this.infos.push({key: "Width", value: image.width + " px"});
                    this.infos.push({key: "Height", value: image.height + " px"});
                    // TODO: color channels, MD5, SHA1, SHA256, Bit depth, Bits Per Sample

                    const createHistogram = (type: any) => {
                        const canvas = this.histogramGeneratorService.generateImageHistogram(image, 400, 100, type);
                        canvas.style.maxWidth = "100%";
                        canvas.style.border = "3px solid black";
                        this.histograms.nativeElement.append(canvas);
                    };
                    createHistogram("red");
                    createHistogram("green");
                    createHistogram("blue");
                    createHistogram("avg");
                };
                const imageWrapper = document.createElement("div");
                imageWrapper.className = "image-wrapper";
                imageWrapper.append(image);

                this.previewBody.nativeElement.append(imageWrapper);
                image.src = URL.createObjectURL(uploadedFile);

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
                    reader.onload = async () => {
                        const audioContext = new AudioContext();
                        const audioBuffer = await audioContext.decodeAudioData(reader.result as ArrayBuffer);
                        const canvas = this.histogramGeneratorService.generateAudioHistogram(audioBuffer, this.previewBody.nativeElement.clientWidth, 200, 200);
                        canvas.style.maxWidth = "100%";
                        canvas.style.height = "calc(100% - 62px)";
                        this.previewBody.nativeElement.append(canvas);

                        this.infos.push({key: "Audio data", type: "divider"});
                        this.infos.push({key: "Channels", value: audioBuffer.numberOfChannels});
                        this.infos.push({key: "Sample rate", value: audioBuffer.sampleRate});
                        this.infos.push({key: "Duration", value: audio.duration + " s"});
                        this.infos.push({key: "Text tracks", value: audio.textTracks && audio.textTracks.length || 0});
                        this.infos.push({key: "Audio tracks", value: audio.audioTracks && audio.audioTracks.length || 0});
                    };
                    reader.readAsArrayBuffer(uploadedFile);

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
