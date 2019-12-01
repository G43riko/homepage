import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {MovieSource} from "./models/movie-source.type";
import {MovieType} from "./models/movie-type.type";

@Injectable({
    providedIn: "root",
})
export class MovieService {
    public constructor(private readonly router: Router) {
    }

    public openMovieExternal(source: MovieSource, id: string | number, type: MovieType = "movie"): Window | null {
        switch (source) {
            case "csfd":
                return window.open("https://www.csfd.cz/film/" + id, "_blank");
            case "imdb":
                return window.open("https://www.imdb.com/title/" + id, "_blank");
            case "movieDb":
                const path = type === "movie" ? "movie" : "tv";
                return window.open("https://www.themoviedb.org/" + path + "/" + id, "_blank");
        }
    }

    public showMovieDetail(movie_id: number | string): void {
        this.router.navigateByUrl("/movies/" + movie_id);
    }

    public openMakerExternal(source: MovieSource, id: number): Window | null {
        switch (source) {
            case "csfd":
                return window.open("https://www.csfd.cz/tvurce/" + id, "_blank");
            case "movieDb":
                return window.open("https://www.themoviedb.org/person/" + id, "_blank");
            case "imdb":
                return window.open("https://www.imdb.com/name/" + id, "_blank");
        }
    }
}
