import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin } from "rxjs";
import { AbstractDetailComponent } from "../../../shared/components/abstract-detail.component";
import { MoviesService } from "../../../shared/services/movies.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { Movie } from "../models/movie.model";

declare const $: any;

@Component({
    selector: "app-movie-detail",
    templateUrl: "./movie-detail.component.html",
    styleUrls: ["./movie-detail.component.scss"],
})
export class MovieDetailComponent extends AbstractDetailComponent implements OnInit {
    public selectedMovie: Movie;
    public genres: string[]    = [];
    public countries: string[] = [];

    public constructor(private readonly route: ActivatedRoute,
                       private readonly notificationService: NotificationService,
                       private readonly movieService: MoviesService) {
        super();
    }

    public ngOnInit(): void {
        this.route.params.subscribe((data: any) => {
            const actId = data["id"];
            if (actId === "new") {
                this.selectedMovie = new Movie();
                this.isNew         = true;
                this.initComponents();
            } else {
                this.movieService.getDetail(actId).subscribe((movie: Movie) => {
                    this.selectedMovie = movie;
                    this.initComponents();
                }, (error) => this.notificationService.showErrorMessage(error));
            }
        });
    }

    public setDisabled(value: boolean = this.disabled): void {
        const elements = $(".ui.dropdown.search");
        value ? elements.addClass("disabled") : elements.removeClass("disabled");
    }

    public save(): void {
        const genres    = $(".ui.dropdown.search.genres").dropdown("get values");
        const countries = $(".ui.dropdown.search.countries").dropdown("get values");
        this.disabled   = true;
    }

    public back(): void {
        this.disabled = true;
        this.setDisabled();
    }

    public edit(): void {
        this.disabled = false;
        this.setDisabled();
    }

    private initComponents(): void {
        const countries$ = this.movieService.getCountries();
        const genres$    = this.movieService.getGenres();
        forkJoin(countries$, genres$).subscribe((data: string[][]) => {
            this.countries = data[0] as string[];
            this.genres    = data[1] as string[];

            $(".ui.checkbox").checkbox();
            $(".ui.dropdown.search").dropdown({
                allowAdditions: true,
            });
            $(".ui.dropdown.search.genres").dropdown("set selected", this.selectedMovie.genres);
            $(".ui.dropdown.search.countries").dropdown("set selected", this.selectedMovie.countries);
            this.setDisabled();
        }, (error: any) => this.notificationService.showErrorMessage(error));
    }
}
