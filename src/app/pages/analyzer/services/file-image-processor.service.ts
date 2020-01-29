import { Injectable } from "@angular/core";
import { HistogramGeneratorService } from "./histogram-generator.service";

export interface FileProcessResult {
    infos?: { key: string, value?: string | number, type?: "divider" }[];
    histograms?: HTMLElement[];
    previewContent: HTMLElement[] | string;
}

@Injectable({
    providedIn: "root"
})
export class FileImageProcessorService {
    public constructor(private readonly histogramGeneratorService: HistogramGeneratorService) {
    }

    public async getExifData(image: HTMLImageElement): Promise<FileProcessResult["infos"]> {
        return new Promise(async (success, reject) => {
            const EXIF = await import("exif-js") as any;
            if (!EXIF.getData(image, function (): void {
                // @ts-ignore
                const data = EXIF.getAllTags(this);

                const convertEntry = (entry: [string, any]): any => {
                    const getValue = (): string | number => {
                        return entry[1];
                    };
                    const getTitle = (): string => {
                        return entry[0];
                    };

                    return {
                        key: getTitle(),
                        value: getValue(),
                    };
                };

                const result = Object.entries(data)
                                     .filter((entry) => entry[0] !== "thumbnail")
                                     .map(convertEntry);
                const thumbnail = data.thumbnail;
                if (thumbnail) {
                    result.push({type: "divider"});
                    result.push(...Object.entries((thumbnail))
                                         .filter((entry) => entry[0] !== "blob")
                                         .map(convertEntry));
                }

                success(result);

            })) {
                reject([]);
            }
        });
    }

    public processImage(uploadedFile: File): Promise<FileProcessResult> {
        const infos: FileProcessResult["infos"] = [];
        const histograms: HTMLElement[] = [];

        const image = document.createElement("img") as HTMLImageElement;

        return new Promise((success, reject) => {
            image.onload = async () => {
                infos.push({key: "Image data", type: "divider"});
                infos.push({key: "Width", value: image.naturalWidth + " px"});
                infos.push({key: "Height", value: image.naturalHeight + " px"});
                // TODO: color channels, MD5, SHA1, SHA256, Bit depth, Bits Per Sample

                const exifInfos = await this.getExifData(image);
                if (exifInfos) {
                    infos.push(...exifInfos);
                }
                const createHistogram = (type: any) => {
                    const canvas = this.histogramGeneratorService.generateImageHistogram(image, 400, 100, type);
                    canvas.style.maxWidth = "100%";
                    canvas.style.border = "3px solid black";
                    histograms.push(canvas);
                };
                createHistogram("red");
                createHistogram("green");
                createHistogram("blue");
                createHistogram("avg");
                success({infos, histograms, previewContent: [imageWrapper]});
            };
            const imageWrapper = document.createElement("div");
            imageWrapper.className = "image-wrapper";
            imageWrapper.append(image);

            image.src = URL.createObjectURL(uploadedFile);
        });
    }

    public processSvg(uploadedFile: File): Promise<FileProcessResult> {
        const reader = new FileReader();

        return new Promise((success, reject) => {
            reader.onload = () => {
                const wrapper = document.createElement("div");
                wrapper.innerHTML = reader.result as string;
                wrapper.style.stroke = "black";
                wrapper.style.fill = "blue";
                success({previewContent: [wrapper]});
            };
            reader.readAsText(uploadedFile);
        });
    }
}
