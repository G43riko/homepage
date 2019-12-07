import {PlayerInterface} from "./player.interface";

export class AudioPlayerModel implements PlayerInterface {
    private _actualPreview: HTMLAudioElement | null;

    public previous(): void {
    }

    public next(): void {
    }

    public minimalize(): void {
    }

    public fullscreen(): void {
    }

    public play(preview?: string): Promise<any> {
        if (!this._actualPreview) {
            if (!preview) {
                throw new Error("Nieje možné vytvoriť pesničku bez URL");
            }
            this._actualPreview = new Audio(preview);
        }
        if (preview && this._actualPreview.currentSrc !== preview) {
            this._actualPreview.src = preview;
        }
        return this._actualPreview.play();
    }

    public pause(): void {
        if (this._actualPreview) {
            this._actualPreview.pause();
        }
    }

    public stop(): void {
        if (this._actualPreview) {
            this._actualPreview.pause();
        }
        this._actualPreview = null;
    }

    public getDuration(): number {
        return Number(this._actualPreview && this._actualPreview.duration);
    }

    public getCurrentTime(): number {
        return Number(this._actualPreview && this._actualPreview.currentTime);
    }

    public setCurrentTime(seconds: number): void {
        if (this._actualPreview) {
            this._actualPreview.currentTime = seconds;
        }
    }

}
