import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MovieSource } from "../models/movie-source.type";
import { MovieType } from "../models/movie-type.type";

@Injectable()
export class MovieService {
    public constructor(private readonly router: Router) {
    }

    public openMovieExternal(source: MovieSource, id: string | number, type: MovieType = "movie"): Window | null {
        switch (source) {
            case MovieSource.csfd:
                return window.open("https://www.csfd.cz/film/" + id, "_blank");
            case MovieSource.imdb:
                return window.open("https://www.imdb.com/title/" + id, "_blank");
            case MovieSource.movieDb:
                const path = type === "movie" ? "movie" : "tv";

                return window.open("https://www.themoviedb.org/" + path + "/" + id, "_blank");
        }
    }
    public showMovieCreateForm(): void {
        this.router.navigateByUrl("/movies/new");
    }


    public showMovieDetail(movieId: number | string): void {
        this.router.navigateByUrl("/movies/" + movieId);
    }

    public showMakerDetail(movieId: number | string): void {
        this.router.navigateByUrl("/movies/makers/" + movieId);
    }

    public openMakerExternal(source: MovieSource, id: number | string): Window | null {
        switch (source) {
            case MovieSource.csfd:
                return window.open("https://www.csfd.cz/tvurce/" + id, "_blank");
            case MovieSource.movieDb:
                return window.open("https://www.themoviedb.org/person/" + id, "_blank");
            case MovieSource.imdb:
                return window.open("https://www.imdb.com/name/" + id, "_blank");
        }
    }
}
