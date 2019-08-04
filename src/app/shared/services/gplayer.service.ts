import { Injectable } from "@angular/core";
import { MathUtils } from "gtools";
import { YoutubeService } from "./youtube.service";

declare let YT: any;

@Injectable()
export class GPlayerService {
    public actualPlayList: any[] = [];
    public playingSong: any;
    private readonly _player: any;
    private readonly _id         = "gplayer";

    public constructor(private readonly _youtubeService: YoutubeService) {
        this._player = new YT.Player(this._id, {
            events: {
                onStateChange: (event: any) => this._onStateChange(event),
            },
            playerVars: {
                disablekb: 1, // disable keyboard
                controls: 0, // hide controlls
                fs: 0, // hide fullscreen button
                showinfo: 0, // hide info
            },
        });
    }

    public getTime(): number {
        return this._player && parseInt(this._player.getCurrentTime(), 10);
    }

    public pause(): void {
        this._player && this._player.pauseVideo();
    }

    public play(): void {
        this._player && this._player.playVideo();
    }

    public stop(): void {
        this._player && this._player.stopVideo();
    }

    public next(): void {
        this._player && this._player.nextVideo();
    }

    public previous(): void {
        this._player && this._player.previousVideo();
    }

    public mute(): void {
        this._player && this._player.mute();
    }

    public unmute(): void {
        this._player && this._player.unmute();
    }

    public setVolume(value: number): void {
        this._player && this._player.setVolume(value);
    }

    public getVolume(): void {
        return this._player && this._player.getVolume();
    }

    public playFrom(seconds: number): void {
        this._player && this._player.seekTo(seconds, true);
    }

    public playByName(title: string): void {
        // $.get("http://localhost:3000/songs/search/" + encodeURI(title), (data) => {
        this._youtubeService.searchVideo(encodeURI(title)).subscribe((data) => {
            if (data.items.length && this._player) {
                this._player.loadVideoById(data.items[0].id.videoId);
            }
        });
    }

    private _onStateChange(event: any): void {

    }

    private _getStringFromS(time: number): string {
        const minutes = parseInt((time / 60) + "", 10);
        const seconds = time % 60;
        return MathUtils.pad(minutes, 2) + ":" + MathUtils.pad(seconds, 2);
    }

}
