import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../shared/services/notification.service";
import { SongsService } from "../../shared/services/songs.service";
import { GPlayer } from "./GPlayer.component";

declare let $: any;
declare let window: any;

// let player;

@Component({
    selector: "app-songs",
    templateUrl: "./songs.component.html",
    styleUrls: ["./songs.component.scss"],
})
export class SongsComponent implements OnInit {
    public gplayer: GPlayer;
    private playing: HTMLAudioElement | null = null;

    public constructor(private readonly songService: SongsService, private readonly notificationService: NotificationService) {
    }

    public clickOnModal(e: MouseEvent): void {
        const target = e.target as HTMLElement;
        if (!target.matches("#modalContent")) {
            target.classList.add("hidden");
        }
    }

    public ngOnInit(): void {
        const modal = $("#modal");
        // window["play"] = () => this.play();
        modal.hide();
        /*
        modal.click(function (e) {
            if (!e.target.matches("#modalContent")) {
                modal.hide();
            }
        });
        */
        this.loadAllSongs();

        // document.getElementById("search").onkeydown = (event: any) => this.search(event.target.value);

        const tag            = document.createElement("script");
        tag.src              = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window["onYouTubeIframeAPIReady"] = () => {
                this.gplayer      = new GPlayer("player");
                window["gplayer"] = this.gplayer;
            };
        }
    }

    public search(key: string): void {
        const searchString = key.toLowerCase();
        const result       = document.querySelector("#songList tbody tr");
        $("#songList tbody tr").each(function(): void {
            const thisElement: HTMLElement = this as any;
            const tr                       = $(thisElement);
            if (tr.text().toLowerCase().indexOf(searchString) < 0) {
                // tr.addClass("hidden");
                thisElement.classList.add("hidden");
                // this.style.display = "none";
            } else {
                // tr.removeClass("hidden");
                thisElement.classList.remove("hidden");
                // this.style.display = "table-row";
            }
        });
    }

    private play(url: string, button: HTMLButtonElement): void {
        let oldUrl = "";
        if (this.playing) {
            oldUrl = this.playing.currentSrc;
            this.playing.pause();
            this.playing = null;
            $(".playing").text("play").removeClass("playing");
        }
        if (oldUrl === url) {
            button.classList.remove("playing");
            button.innerText = "play";
            return;
        }

        this.playing = new Audio(url);
        this.playing.play();
        button.classList.add("playing");
        button.innerText = "stop";
    }

    private loadAllSongs(): void {
        // $.get("http://localhost:3000/songs/list", function (data) {
        this.songService.getSongs().subscribe((data) => {
            GPlayer.songList = data;
            let result       = "";
            let counter      = 1;
            data.forEach((item, index) => {
                result += "<tr>";
                result += "<td>" + counter++ + "</td>";
                result += "<td>" + item.artists.map((a: any) => a.name).join(" And ") + "</td>";
                result += "<td><a href='" + item.spotifi_link + "'>" + item.title + "<a></td>";
                result += "<td>" + item.duration + "</td>";
                result += "<td>" + item.popularity + "</td>";
                if (item.preview) {
                    result += "<td><button onclick=\"play(' + item.preview + ', this)\">play</button>";
                } else {
                    result += "<td><button disabled>play</button>";
                }
                result += "<button onclick=\"gplayer.playByIndex('" + index + "')\">youtube</button></td>";
                result += "</tr>";
            });
            $("table tbody").append(result);
        }, (error) => this.notificationService.showErrorMessage(error));
    }
}
