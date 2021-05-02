import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { finalize } from "rxjs/operators";
import { NotificationService } from "../../../../shared/services/notification.service";
import { MovieSource } from "../../models/movie-source.type";
import { Movie } from "../../models/movie.model";
import { MovieHttpService } from "../../services/movie-http.service";
import { MovieService } from "../../services/movie.service";

@Component({
    selector       : "app-movie-search",
    templateUrl    : "./movie-search.component.html",
    styleUrls      : ["./movie-search.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieSearchComponent {
    public readonly MovieSource                                  = MovieSource;
    @Output() public readonly movieSearched: EventEmitter<Movie> = new EventEmitter();
    public loading                                               = false;
    private readonly movieListSource$                            = new BehaviorSubject<Movie[]>([]);
    public readonly movieList$                                   = this.movieListSource$.asObservable();
    public readonly movieSearchForm                              = this.formBuilder.group({
        title: "",
        id   : "",
        type : ["csfd", Validators.required]
    }, {
        validators: [this.validateForm]
    });

    public constructor(private readonly formBuilder: FormBuilder,
                       private readonly notificationService: NotificationService,
                       private readonly movieService: MovieService,
                       private readonly moviesHttpService: MovieHttpService) {
    }

    public searchMovie(): void {
        console.log(this.movieSearchForm.value);
        const value = this.movieSearchForm.value;
        value.title ? this._searchByName(value.title) : this.searchById(value.id);
    }

    public searchById(id: string | number): void {
        this.loading = true;
        this.moviesHttpService
            .getMovieDetailFromExternalSource(this.movieSearchForm.value.type, String(id))
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next    : (searchedMovie) => this.movieSearched.emit(searchedMovie),
                error   : (error) => this.notificationService.openErrorNotification(error),
                complete: () => this.loading = false,
            });
    }

    private validateForm(c: FormControl): null | { formValidationError: any } {
        return (c.value.title || c.value.id) ? null : {
            formValidationError: "Title or ID is required"
        };
    }

    private _searchByName(name: string): void {
        this.loading = true;
        this.moviesHttpService
            .getMoviesFromExternalSource(this.movieSearchForm.value.type, name)
            .subscribe({
                next    : (searchedMovie) => this.movieListSource$.next(searchedMovie),
                error   : (error) => this.notificationService.openErrorNotification(error),
                complete: () => this.loading = false,
            });
        // .subscribe((searchedMovie) => {
        //     this.movieResults = searchedMovie;
        // }, (error) => this.notificationService.openErrorNotification(error));
    }

    private getTypeFromMovie(result: Movie): MovieSource {
        if (result.movieDbId) {
            return MovieSource.movieDb;
        }
        if (result.csfdId) {
            return MovieSource.csfd;
        }
        if (result.imdbId) {
            return MovieSource.imdb;
        }

        throw new Error("Cannot determine type for movie " + JSON.stringify(result));
    }

    private extractExternalIdFromMovie(movie: Movie): string {
        return String(movie.csfdId || movie.imdbId || movie.movieDbId || "");
    }

    public onExternalDetailClick(result: Movie): void {
        this.movieService.openMovieExternalMovie(this.getTypeFromMovie(result), this.extractExternalIdFromMovie(result));
    }

    public onSelectExternalMovieClick(result: Movie): void {
        this.loading = true;
        this.moviesHttpService
            .getMovieDetailFromExternalSource(this.getTypeFromMovie(result), this.extractExternalIdFromMovie(result))   .subscribe({
            next    : (searchedMovie) => this.movieSearched.emit(searchedMovie),
            error   : (error) => this.notificationService.openErrorNotification(error),
            complete: () => this.loading = false,
        });
    }
}
