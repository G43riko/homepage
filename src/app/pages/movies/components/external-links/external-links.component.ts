import {Component, Input, OnInit} from "@angular/core";
import {MovieService} from "../../movie.service";
import {MovieType} from "../../models/movie-type.type";

@Component({
    selector: "app-external-links",
    templateUrl: "./external-links.component.html",
    styleUrls: ["./external-links.component.scss"],
})
export class ExternalLinksComponent implements OnInit {
    @Input() public holder: { csfdId?: number, movieDbId?: number, imdbId: string, type?: MovieType };
    @Input() public type: "movie" | "maker" = "movie";
    public constructor(public readonly movieService: MovieService) {
    }

    public ngOnInit(): void {
    }

}
