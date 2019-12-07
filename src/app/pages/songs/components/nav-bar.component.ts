import {Component, OnDestroy} from "@angular/core";
import {interval, Subscription} from "rxjs";
import {AudioPlayerModel} from "../models/audio-player.model";
import {PlayerInterface} from "../models/player.interface";
import {YoutubePlayerModel} from "../models/youtube-player.model";
import {Song} from "../songs-list/songs-list.component";

@Component({
    selector: "songs-nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.scss"],
})
export class SongsNavBarComponent implements OnDestroy {
    public player: PlayerInterface;
    public duration = 0;
    public elapsedValue = 0;
    public selectedSong: Song | null;
    private state: "play" | "pause" | "stop" = "stop";
    private readonly previewPlayer: AudioPlayerModel = new AudioPlayerModel();
    private readonly youtubePlayer: YoutubePlayerModel = new YoutubePlayerModel();
    private subscription: Subscription;

    public ngOnInit(): void {

    }

    public playFrom(time: string): void {
        this.player.setCurrentTime(Number(time));
        this.elapsedValue = this.player.getCurrentTime();
        this.player.play();
    }

    public play(song?: Song): void {
        if (song) {
            this.selectedSong = song;
            this.player = this.previewPlayer as any;
            this.youtubePlayer.stop();
            this.previewPlayer.play(song.preview).then(() => {
                this.duration = this.previewPlayer.getDuration();
                this._startPlaying();
            });
            return;
        }
        this.player.play().then(() => this._startPlaying());
    }

    public pause(): void {
        this.player.pause();
        this.state = "pause";
    }

    public stop(): void {
        this.selectedSong = null;
        this.duration = 0;
        this.elapsedValue = 0;
        this.player.stop();
        this.state = "stop";
    }

    public isPlaying(song?: Song): boolean {
        if (song) {
            return this.selectedSong === song && this.isPlaying();
        }
        return this.state === "play";
    }

    public isPaused(song?: Song): boolean {
        if (song) {
            return this.selectedSong === song && this.isPaused();
        }
        return this.state === "pause";
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private _startPlaying(): void {
        this.state = "play";
        this.duration = this.player.getDuration();

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = interval(100).subscribe(() => {
            this.elapsedValue = this.player.getCurrentTime();
        });
    }
}
