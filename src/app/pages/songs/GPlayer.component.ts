import {MathUtils} from "gtools";

declare let YT: any;
declare let $: any;

function setFullScreen(fullScreen: boolean, el: any = document.documentElement): void {
    if (fullScreen) {
        const rfs = el.requestFullscreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
            || el.msRequestFullscreen;
        rfs.call(el);
    } else {
        const rfs = document.exitFullscreen
            || (document as any).webkitExitFullscreen;
        // || document.mozExitFullscreen
        // || document.msExitFullscreen
        rfs.call(document);
    }
}

export class GPlayer {
    public static songList: any[];
    public inputSlider: any;
    private readonly _id: string;
    private readonly _player: any;
    private _interval: any;

    constructor(id = "gplayer") {
        this._id = id;
        this._initButtons();
        this._player = new YT.Player(id, {
            events: {
                onStateChange: (event: any) => this.onStateChange(),
            },
            playerVars: {
                disablekb: 1, // disable keyboard
                controls: 0, // hide controlls
                fs: 0, // hide fullscreen button
                showinfo: 0, // hide info
            },
        });
    }

    private _playingSong: any;

    set playingSong(song: any) {
        const duration = document.getElementById("duration");
        const fileName = document.getElementById("fileName");

        if (duration) {
            const durationInS    = parseInt((song.duration / 1000) + "", 10);
            duration.innerText   = this._getStringFromS(durationInS);
            this.inputSlider.max = durationInS;
        }

        if (fileName) {
            const artists      = song.artists.map((a: any) => a.name).join(" AND ");
            fileName.innerHTML = artists + "<br/>" + song.title;
        }

        this._playingSong = song;
    }

    public _initButtons(): void {
        this.inputSlider          = document.querySelector("#slider input");
        if (this.inputSlider) {
            this.inputSlider.onchange = (event: any) => {
                this.playFrom(event.target.value);
            };
        }
    }

    public fullscreen(): void {
        setFullScreen(true, document.getElementById(this._id));
    }

    public onStateChange(): void {
        const play  = document.getElementById("play");
        const pause = document.getElementById("pause");
        switch (this.getState()) {
            case -1: // unstarted
                break;
            case 0: // ended
                clearInterval(this._interval);
                break;
            case 1: // playing
                play && play.classList.add("hidden");
                pause && pause.classList.remove("hidden");
                break;
            case 2: // paused
                pause && pause.classList.add("hidden");
                play && play.classList.remove("hidden");
                break;
            case 3: // buffering
                break;
            case 5: // video cued
                break;
        }
        console.log();
    }

    public _setPlaying(isPlaying: boolean): void {
        const songList = document.getElementById("songList");
        const footer   = document.getElementById("footer");

        if (songList) {
            songList.classList.toggle("isPlaying", isPlaying);
        }
        if (footer) {
            footer.classList.toggle("isPlaying", isPlaying);
        }
    }

    public isPlaying(): void {
        const state = this._player.getPlayerState();
    }

    public getState(): number {
        return this._player.getPlayerState();
    }

    public minimalize(): void {
        const minimalize = document.getElementById("minimalize");
        const modal      = document.getElementById("modal");

        if (modal && minimalize) {
            const value = modal.classList.toggle("hidden");
            if (minimalize) {
                minimalize.classList.toggle("fa-window-maximize", value);
                minimalize.classList.toggle("fa-window-minimize", !value);
            }
        }
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

    public getVolume(): any {
        return this._player && this._player.getVolume();
    }

    public playFrom(seconds: number): void {
        this._player && this._player.seekTo(seconds, true);
    }

    public playByName(title: string): void {
        this._setPlaying(true);
        $("#modal").show();
        console.log("teraz hladam: ", title);
        $.get("http://localhost:3000/songs/search/" + encodeURI(title), (data: any) => {
            if (data.items.length && this._player) {
                this._player.loadVideoById(data.items[0].id.videoId);
            }
        }, "json");
    }

    public _getStringFromS(time: number): string {
        const minutes = parseInt((time / 60) + "", 10);
        const seconds = time % 60;
        return MathUtils.pad(minutes, 2) + ":" + MathUtils.pad(seconds, 2);
    }

    public getFullName(song: any): string {
        const selectedSong = song || this._playingSong;
        if (!selectedSong) {
            return "";
        }
        const artists = selectedSong.artists.map((a: any) => a.name).join(" AND ");
        return artists + " - " + selectedSong.title;
    }

    public playByIndex(index: number): void {
        if (GPlayer.songList && GPlayer.songList[index]) {
            this.playingSong = GPlayer.songList[index];
            this.playByName(this._playingSong.artists.map((a: any) => a.name).join(" ") + " " + this._playingSong.title);

            const element = document.getElementById("actTime");
            if (element) {
                this._interval = setInterval(() => {
                    const timeElapsed      = this.getTime();
                    this.inputSlider.value = timeElapsed;
                    element.innerText      = this._getStringFromS(timeElapsed);
                }, 1000);
            }
        }
    }

    public addToQueebyName(title: string): void {
        $.get("/songs/search/" + encodeURI(title), (data: any) => {
            if (data.items.length && this._player) {
                this._player.cueVideoById(data.items[0].id.videoId);
            }
        }, "json");
    }
}
