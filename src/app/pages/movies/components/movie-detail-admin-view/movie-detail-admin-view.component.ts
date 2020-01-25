import {animate, state, style, transition, trigger} from "@angular/animations";
import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {MiscUtils} from "gtools";
import {MovieSource} from "../../models/movie-source.type";
import {MovieType} from "../../models/movie-type.type";
import {Movie} from "../../models/movie.model";
import {MovieHttpService} from "../../services/movie-http.service";

@Component({
    selector: "app-movie-detail-admin-view",
    templateUrl: "./movie-detail-admin-view.component.html",
    styleUrls: ["./movie-detail-admin-view.component.scss"],
    animations: [
        trigger("detailExpand", [
            state("collapsed", style({height: "0px", minHeight: "0"})),
            state("expanded", style({height: "*"})),
            transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))
        ])
    ]
})
export class MovieDetailAdminViewComponent implements OnInit {
    @Input() public movieForm: FormGroup;
    public displayedColumns: string[] = [];
    public csfdMovie: Movie;
    public imdbMovie: Movie;
    public dataSource: any[] = [];
    public expandedElement: any | null;
    public movieDbMovie: Movie;

    public constructor(private readonly movieHttpService: MovieHttpService) {
    }

    public ngOnInit(): void {
        this.setData();
    }

    public load(source: MovieSource, type: MovieType = "movie"): void {
        switch (source) {
        case "csfd":
            this.movieHttpService.getMovieDetailFromExternalSource(source, this.movieForm.value.csfdId).subscribe((response) => {
                this.csfdMovie = response;
                this.setData();
            });
            break;
        case "imdb":
            this.movieHttpService.getMovieDetailFromExternalSource(source, this.movieForm.value.imdbId).subscribe((response) => {
                this.imdbMovie = response;
                this.setData();
            });
            break;
        case "movieDb":
            this.movieHttpService.getMovieDetailFromExternalSource(source, this.movieForm.value.movieDbId, type).subscribe((response) => {
                this.movieDbMovie = response;
                this.setData();
            });
            break;
        }
    }

    public isExpanded(row: any): boolean {
        return MiscUtils.isIn(row.attribute, "makers");
    }

    private setData(): void {
        const transformItem = <T extends Movie>(source: T, attribute: keyof T): any => {
            if (!source) {
                return undefined;
            }

            return source[attribute];
        };

        this.displayedColumns = ["attribute", "origin"];
        if (this.csfdMovie) {
            this.displayedColumns.push("csfd");
        }
        if (this.imdbMovie) {
            this.displayedColumns.push("imdb");
        }
        if (this.movieDbMovie) {
            this.displayedColumns.push("movieDb");
        }
        const addRow = <T extends Movie>(attribute: keyof Movie, type?: string) => ({
            attribute, type,
            origin: transformItem<T>(this.movieForm.value, attribute),
            csfd: transformItem<Movie>(this.csfdMovie, attribute),
            imdb: transformItem<Movie>(this.imdbMovie, attribute),
            movieDb: transformItem<Movie>(this.movieDbMovie, attribute)
        });
        this.dataSource = [
            addRow("year", "year"),
            addRow("duration"),
            addRow("makers", "arrayLength"),
            addRow("genres", "join"),
            addRow("countries", "join"),
            addRow("rating"),
            addRow("avatar", "imageFirst"),
            addRow("content", "html")
        ];
    }
}
