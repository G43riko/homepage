import {Component, OnInit} from "@angular/core";
import {TimeUtils} from "gtools";
import {AudioPlayerModel} from "../models/audio-player.model";
import {PlayerInterface} from "../models/player.interface";
import {YoutubePlayerModel} from "../models/youtube-player.model";

@Component({
    selector: "songs-nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.scss"],
})
export class SongsNavBarComponent implements OnInit {
    public player: PlayerInterface;
    public isPlaying = false;
    public isPaused = false;
    public duration                                    = "00:00";
    public numberDuration                              = 0;
    public elapsedValue                                = 0;
    public actDuration                                 = "00:00";
    private readonly previewPlayer: AudioPlayerModel   = new AudioPlayerModel();
    private readonly youtubePlayer: YoutubePlayerModel = new YoutubePlayerModel();
    private _interval: any;

    public ngOnInit(): void {

    }

    public playPreview(preview: string): void {
        this.player = this.previewPlayer as any;
        this.youtubePlayer.stop();
        this.previewPlayer.play(preview).then(() => {
            this.duration = TimeUtils.getStringFromSeconds(parseInt(this.previewPlayer.getDuration().toString(), 10));
            this._startPlaying();
        });
    }

    public playFrom(time: string): void {
        this.player.setCurrentTime(Number(time));
        this.elapsedValue = this.player.getCurrentTime();
        this.actDuration = TimeUtils.getStringFromSeconds(parseInt(this.elapsedValue.toString(), 10));
        this.player.play();
    }

    public pausePreview(): void {
        this.previewPlayer.pause();
        this._changeState("pause");
    }

    public play(): void {
        this.player.play().then(() => this._startPlaying());
    }

    public pause(): void {
        const playingClass = "playing";
        const lastPlayed   = document.getElementsByClassName(playingClass)[0] as HTMLButtonElement;
        if (lastPlayed) {
            lastPlayed.classList.remove(playingClass);
            lastPlayed.innerText = "Play";
        }
        this.player.pause();
        this._changeState("pause");
    }

    public stop(): void {
        this.player.stop();
        this._changeState("stop");
    }

    private _startPlaying(): void {
        this._changeState("play");
        this.actDuration    = "00:00";
        this.numberDuration = this.player.getDuration();
        this._interval      = setInterval(() => {
            this.elapsedValue = this.player.getCurrentTime();
            this.actDuration  = TimeUtils.getStringFromSeconds(parseInt(this.elapsedValue.toString(), 10));
            // console.log(this.elapsedValue, "(",this.actDuration,") === ", this.numberDuration);
        }, 1000);
    }

    private _changeState(state: "play" | "pause" | "stop"): void {
        switch (state) {
            case "play":
                this.isPaused  = false;
                this.isPlaying = true;
                break;
            case "pause":
                this.isPaused  = true;
                this.isPlaying = false;
                break;
            case "stop":
                this.isPaused  = false;
                this.isPlaying = false;
                break;

        }
    }
}
