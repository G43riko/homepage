import { Injectable } from '@angular/core';
import { FileProcessResult } from "./file-image-processor.service";

@Injectable({
  providedIn: 'root'
})
export class FileVideoProcessorService {

  public processVideo(uploadedFile: File): Promise<FileProcessResult> {
      const infos: FileProcessResult["infos"] = [];

      return new Promise<FileProcessResult>((success, reject) => {
          const video = document.createElement("video");
          video.src = URL.createObjectURL(uploadedFile);
          video.style.width = "100%";
          video.style.height = "100%";
          video.controls = true;

          video.onloadeddata = () => {
              infos.push({key: "Video data", type: "divider"});
              infos.push({key: "Width", value: video.videoWidth + " px"});
              infos.push({key: "Height", value: video.videoHeight + " px"});
              infos.push({key: "Duration", value: video.duration + " s"});
              infos.push({key: "Text tracks", value: video.textTracks && video.textTracks.length || 0});
              infos.push({key: "Video tracks", value: video.videoTracks && video.videoTracks.length || 0});
              infos.push({key: "Audio tracks", value: video.audioTracks && video.audioTracks.length || 0});
              success({infos, previewContent: [video]});
          };
      });
  }
}
