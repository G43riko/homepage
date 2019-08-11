import { Component, OnInit, ViewChild } from "@angular/core";
import { SongsService } from "../songs.service";
import { SongsNavBarComponent } from "../components/nav-bar.component";

@Component({
    selector: "app-songs",
    templateUrl: "./songs-list.component.html",
    styleUrls: ["./songs-list.component.scss"],
})
export class SongsListComponent implements OnInit {
    public readonly titles = ["#", "Autory", "Názov", "Dĺžka (ms)", "Popularita", "Ukážka", "Video"];
    public songs: any[]    = [];
    @ViewChild(SongsNavBarComponent, {static: false}) private readonly _navComponent: SongsNavBarComponent;

    public constructor(private readonly songsService: SongsService) {

    }

    public ngOnInit(): void {
        this.songsService.getSongs().subscribe((data) => {
            this.songs = data;
        });
    }

    public play(url: string, button: HTMLButtonElement): void {
        const playingClass = "playing";
        if (button.classList.contains(playingClass)) {
            this._navComponent.pausePreview();
            button.classList.remove(playingClass);
            button.innerText = "Play";
        } else {
            const lastPlayed = document.getElementsByClassName(playingClass)[0] as HTMLButtonElement;
            if (lastPlayed) {
                lastPlayed.classList.remove(playingClass);
                lastPlayed.innerText = "Play";
            }
            button.classList.add(playingClass);
            this._navComponent.playPreview(url);
            button.innerText = "Pause";
        }
    }

    public clickOnModal(e: MouseEvent): void {
        const target = e.target as HTMLElement;
        if (!target.matches("#modalContent")) {
            target.classList.add("hidden");
        }
    }

    public playByIndex(index: number): void {

    }
}
