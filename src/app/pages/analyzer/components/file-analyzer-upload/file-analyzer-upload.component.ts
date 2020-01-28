import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { AppConfig } from "../../../../app.config";
import { Response } from "../file-analyzer-preview/file-analyzer-preview.component";

interface RequestParams {
    method: "GET" | "POST";
    url: string;
    onResponse: (response: any) => any;
    onProgress: (response: any) => any;
    content: any;
    headers?: { [key: string]: string };
}

function sendRequest({method = "GET", url, onResponse = (response: any) => {}, content, headers = {}, onProgress = () => {}
                     }: RequestParams): void {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        console.log(xhttp.readyState, xhttp.status);
        if (xhttp.readyState === 4 && (xhttp.status === 200 || xhttp.status === 201)) {
            onResponse(xhttp.responseText);
        }
    };
    xhttp.upload.onprogress = onProgress;
    xhttp.open(method, url, true);
    Object.entries(headers)
          .forEach((entry) => xhttp.setRequestHeader(entry[0], entry[1]));

    xhttp.send(content);
}

@Component({
    selector: "app-file-analyzer-upload",
    templateUrl: "./file-analyzer-upload.component.html",
    styleUrls: ["./file-analyzer-upload.component.scss"]
})
export class FileAnalyzerUploadComponent implements OnInit {
    @ViewChild("fileInput", {static: true}) private readonly fileInput: ElementRef<HTMLInputElement>;
    @ViewChild("dropArea", {static: true}) private readonly dropArea: ElementRef<HTMLDivElement>;
    @Output() public readonly fileUploaded = new EventEmitter<void>();
    @Output() public readonly response = new EventEmitter<{response: Response, file: File}>();
    public progress = 0;

    public ngOnInit(): void {
        this.initDragAndDrop();
        this.initInputFile();
    }

    private initDragAndDrop(): void {
        this.dropArea.nativeElement.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
        this.dropArea.nativeElement.addEventListener("dragenter", (event) => {
            this.dropArea.nativeElement.classList.add("drag-over");
            event.preventDefault();
        });
        const stopDrag = () => {
            this.dropArea.nativeElement.classList.remove("drag-over");
        };
        this.dropArea.nativeElement.addEventListener("dragleave", stopDrag);
        this.dropArea.nativeElement.addEventListener("dragend", stopDrag);

        this.dropArea.nativeElement.addEventListener("drop", (event) => {
            this.dropArea.nativeElement.classList.remove("drag-over");
            if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
                this.onFileUpload(event.dataTransfer.files[0]);
            } else {
                throw new Error("Cannot upload file from event: " + event);
            }
            event.preventDefault();
        });
    }

    private initInputFile(): void {
        this.fileInput.nativeElement.addEventListener("change", () => {
            if (this.fileInput.nativeElement.files && this.fileInput.nativeElement.files.length) {
                this.onFileUpload(this.fileInput.nativeElement.files[0]);
            } else {
                throw new Error("Cannot read files using button");
            }
        });
    }

    public showUpload(event: MouseEvent): void {
        this.fileInput.nativeElement.click();
        event.preventDefault();
    }

    private onFileUpload(file: File): void {
        const formData = new FormData();
        formData.append("file", file);
        sendRequest({
            content: formData,
            method: "POST",
            url: AppConfig.BASE_URL + "/poc/analyze/file",
            onProgress: (e) => {
                const value = e.loaded / e.total;
                this.progress = value * 100;
                if (this.progress === 100) {
                    this.fileUploaded.next();
                }
            },
            onResponse: (response) => {
                this.response.next({file, response: JSON.parse(response)});

            },
        });
    }
}
