import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MovieSource } from "../../models/movie-source.type";
import { MovieType } from "../../models/movie-type.type";
import { MovieService } from "../../services/movie.service";

@Component({
    selector       : "app-external-links",
    templateUrl    : "./external-links.component.html",
    styleUrls      : ["./external-links.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalLinksComponent {
    public readonly MovieSource = MovieSource;

    @Input() public holder: { csfdId?: number; movieDbId?: number; imdbId: string; type?: MovieType };
    @Input() private type: "movie" | "maker" = "movie";

    public constructor(private readonly movieService: MovieService) {
    }

    public onLinkClick(movieDb: MovieSource, movieDbId: number | string, type?: "movie" | "tvShow"): void {
        if (this.type === "movie") {
            this.movieService.openMovieExternal(movieDb, movieDbId, type);
        } else if (this.type === "maker") {
            this.movieService.openMakerExternal(movieDb, movieDbId);
        } else {
            throw new Error("Cannot determine type: " + this.type);
        }
    }
}
