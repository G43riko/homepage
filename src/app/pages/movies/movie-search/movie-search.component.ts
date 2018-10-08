import { Component, OnInit } from "@angular/core";

declare const $: any;

@Component({
    selector: "app-movie-search",
    templateUrl: "./movie-search.component.html",
    styleUrls: ["./movie-search.component.scss"],
})
export class MovieSearchComponent implements OnInit {
    public searchKey: string;
    public searchId: string;
    public searchOn: "csfd" | "imdb" | "movieDb" = "imdb";

    public constructor() {
    }

    public ngOnInit(): void {
        $(".ui.checkbox").checkbox();
    }

    public searchMovie(): void {
        this.searchKey ? this.searchByName(this.searchKey) : this.searchById(this.searchId);
    }

    private searchById(id: string): void {

    }

    private searchByName(name: string): void {

    }

}
