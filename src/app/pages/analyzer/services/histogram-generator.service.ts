import { Injectable } from "@angular/core";

class ImageHistogramData {
    public readonly red = new Array(255);
    public readonly green = new Array(255);
    public readonly blue = new Array(255);
    public readonly alpha = new Array(255);

    public constructor() {
        for (let i = 0; i < 256; i++) {
            this.red[i] = 0;
            this.green[i] = 0;
            this.blue[i] = 0;
            this.alpha[i] = 0;
        }
    }

    public get average(): number[] {
        const result = new Array(255);
        for (let i = 0; i < 256; i++) {
            result[i] = (this.red[i] + this.green[i] + this.blue[i]) / 3;
        }

        return result;
    }
}

function createImageHistogramCanvas(data: number[], width: number, height: number, color: string, background = "#FFFFFF"): HTMLCanvasElement {
    const result = document.createElement("canvas") as HTMLCanvasElement;
    result.width = width;
    result.height = height;
    const max = Math.max(...data);
    const temporaryContext = result.getContext("2d") as CanvasRenderingContext2D;
    temporaryContext.fillStyle = background;
    temporaryContext.fillRect(0, 0, width, height);

    temporaryContext.fillStyle = color;
    const pxHeight = height / max;
    const barWidth = width / 255;
    for (let i = 0; i < width; i++) {
        const size = data[i] * pxHeight;
        temporaryContext.fillRect(i * barWidth, height - size, barWidth, size);
    }

    return result;
}

function createAudioHistogramCanvas(data: number[], width: number, height: number, color: string, background = "#FFFFFF"): HTMLCanvasElement {
    const result = document.createElement("canvas") as HTMLCanvasElement;
    const offset = 1;
    result.width = width;
    result.height = height;
    const max = Math.max(...data);
    const temporaryContext = result.getContext("2d") as CanvasRenderingContext2D;
    temporaryContext.fillStyle = background;
    temporaryContext.fillRect(0, 0, width, height);
    temporaryContext.imageSmoothingEnabled = false;

    temporaryContext.fillStyle = color;
    const pxHeight = height / max;
    const barWidth = width / data.length;
    for (let i = 0; i < width; i++) {
        const size = data[i] * pxHeight;
        temporaryContext.fillRect(i * barWidth + offset, height - size, barWidth - offset * 2, size);
    }
    console.log("data: ", data);

    return result;
}


@Injectable()
export class HistogramGeneratorService {
    public generateImageHistogram(image: HTMLImageElement, width: number, height: number, type: "red" | "green" | "blue" | "avg" | "alpha"): HTMLCanvasElement {
        const temporaryCanvas = document.createElement("canvas") as HTMLCanvasElement;
        temporaryCanvas.width = image.width;
        temporaryCanvas.height = image.height;

        const temporaryContext = temporaryCanvas.getContext("2d") as CanvasRenderingContext2D;
        temporaryContext.drawImage(image, 0, 0);
        const temporaryContextData = temporaryContext.getImageData(0, 0, image.width, image.height).data;
        const histogramData = new ImageHistogramData();
        for (let i = 0; i < temporaryContextData.length;) {
            histogramData.red[temporaryContextData[i++]]++;
            histogramData.green[temporaryContextData[i++]]++;
            histogramData.blue[temporaryContextData[i++]]++;
            histogramData.alpha[temporaryContextData[i++]]++;
        }

        switch (type) {
            case "red":
                return createImageHistogramCanvas(histogramData.red, width, height, "red");
            case "green":
                return createImageHistogramCanvas(histogramData.green, width, height, "green");
            case "blue":
                return createImageHistogramCanvas(histogramData.blue, width, height, "blue");
            case "alpha":
                return createImageHistogramCanvas(histogramData.alpha, width, height, "gray");
            default:
                return createImageHistogramCanvas(histogramData.average, width, height, "black");
        }

    }

    public generateAudioHistogram(audioBuffer: AudioBuffer, width: number, height: number, samples = 70): HTMLCanvasElement {
        const filterData = (buffer: AudioBuffer) => {
            const rawData = buffer.getChannelData(0); // We only need to work with one channel of data
            const blockSize = Math.floor(rawData.length / samples); // Number of samples in each subdivision

            const localFilteredData = [];
            for (let i = 0; i < samples; i++) {
                const blockStart = blockSize * i; // the location of the first sample in the block
                let sum = 0;
                for (let j = 0; j < blockSize; j++) {
                    sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
                }
                localFilteredData.push(sum / blockSize); // divide the sum by the block size to get the average
            }

            return localFilteredData;
        };
        const normalizeData = (inputFilteredData: number[]) => {
            const multiplier = Math.pow(Math.max(...inputFilteredData), -1);

            return inputFilteredData.map((n: number) => n * multiplier);
        };
        const filteredData = filterData(audioBuffer);
        const normalizedData = normalizeData(filteredData);

        return createAudioHistogramCanvas(normalizedData,width, height, "#000000");
    }
}
