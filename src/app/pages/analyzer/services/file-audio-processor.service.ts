import { Injectable } from "@angular/core";
import { FileProcessResult } from "./file-image-processor.service";
import { HistogramGeneratorService } from "./histogram-generator.service";

@Injectable({
    providedIn: "root"
})
export class FileAudioProcessorService {

    public constructor(private readonly histogramGeneratorService: HistogramGeneratorService) {
    }

    public processAudio(uploadedFile: File): Promise<FileProcessResult> {
        const infos: FileProcessResult["infos"] = [];
        const reader = new FileReader();
        const audio = document.createElement("audio");
        audio.src = URL.createObjectURL(uploadedFile);
        audio.style.width = "100%";
        audio.controls = true;
        const previewObjects: HTMLElement[] = [audio];

        return new Promise<FileProcessResult>((success, reject) => {
            audio.onloadeddata = () => {
                reader.onload = async () => {
                    const audioContext = new AudioContext();
                    const audioBuffer = await audioContext.decodeAudioData(reader.result as ArrayBuffer);
                    const canvas = this.histogramGeneratorService.generateAudioHistogram(audioBuffer, window.innerWidth, 200, 200);
                    canvas.style.maxWidth = "100%";
                    canvas.style.height = "calc(100% - 62px)";
                    previewObjects.push(canvas);

                    infos.push({key: "Audio data", type: "divider"});
                    infos.push({key: "Channels", value: audioBuffer.numberOfChannels});
                    infos.push({key: "Sample rate", value: audioBuffer.sampleRate});
                    infos.push({key: "Duration", value: audio.duration + " s"});
                    infos.push({key: "Text tracks", value: audio.textTracks && audio.textTracks.length || 0});
                    infos.push({key: "Audio tracks", value: audio.audioTracks && audio.audioTracks.length || 0});

                    success({infos, previewContent: previewObjects});
                };
                reader.readAsArrayBuffer(uploadedFile);

            };
        });
    }
}
