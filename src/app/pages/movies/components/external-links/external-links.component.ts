import { Component, Input } from "@angular/core";
import { MovieType } from "../../models/movie-type.type";
import { MovieService } from "../../services/movie.service";

@Component({
    selector: "app-external-links",
    templateUrl: "./external-links.component.html",
    styleUrls: ["./external-links.component.scss"]
})
export class ExternalLinksComponent {
    @Input() public holder: { csfdId?: number; movieDbId?: number; imdbId: string; type?: MovieType };
    @Input() public type: "movie" | "maker" = "movie";
    public constructor(public readonly movieService: MovieService) {
    }
}
