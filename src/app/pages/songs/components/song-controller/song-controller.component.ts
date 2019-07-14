import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector   : "app-song-controller",
    templateUrl: "./song-controller.component.html",
    styleUrls  : ["./song-controller.component.scss"],
})
export class SongControllerComponent implements OnInit {
    private readonly audio = new Audio();
    private time           = 0;

    public constructor() {
    }

    @Input()
    public set url(url: string) {
        this.audio.src = url;
    }

    public ngOnInit(): void {
    }

    public pause(): void {
        this.audio.pause();
        this.audio.ontimeupdate = null;
    }

    public play(): void {
        this.audio.play();
        this.audio.ontimeupdate = () => this.time = this.audio.currentTime;
    }
}
