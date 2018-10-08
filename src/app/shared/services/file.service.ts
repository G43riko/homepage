import { Injectable } from "@angular/core";

@Injectable()
export class FileService {
    public _input: HTMLInputElement;
    public _link: HTMLAnchorElement;

    public constructor() {
        this._input = document.createElement("input");
        this._input.setAttribute("type", "file");
        this._input.setAttribute("value", "files");
        this._input.setAttribute("class", "hide");

        this._link = document.createElement("a");
        this._link.setAttribute("class", "hide");
        this._link.setAttribute("href", "");
    }

    public saveFile(name: string, text: string, type = "text/plain"): void {
        this._link.href     = URL.createObjectURL(new Blob([text], {type}));
        this._link.download = name;
        this._link.click();
    }

    public saveImage(name: string, image: HTMLImageElement): void {
        this._link.href     = typeof image === "string" ? image : image.src;
        this._link.download = name;
        this._link.click();
    }

    public loadImage(func: any): void {
        this._input.onchange = (e: any): void => {
            const reader  = new FileReader();
            reader.onload = (): void => {
                const image = new Image();
                image.src   = reader.result;
                func(image);
            };
            reader.readAsDataURL(e.target.files[0]);
        };
        this._input.click();
    }

    public loadFile(func: any): void {
        this._input.onchange = (e: any): void => {
            const reader  = new FileReader();
            reader.onload = () => func(reader.result);
            reader.readAsText(e.target.files[0]);
        };
        this._input.click();
    }
}
