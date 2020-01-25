import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {NotificationService} from "../../../../shared/services/notification.service";
import {MovieSource} from "../../models/movie-source.type";
import {Movie} from "../../models/movie.model";
import {MovieHttpService} from "../../services/movie-http.service";
import {MovieService} from "../../services/movie.service";

@Component({
    selector: "app-movie-search",
    templateUrl: "./movie-search.component.html",
    styleUrls: ["./movie-search.component.scss"]
})
export class MovieSearchComponent implements OnInit {
    @Output() public readonly movieSearched: EventEmitter<Movie> = new EventEmitter();
    public loading = false;
    public movieResults: Movie[] = [];
    public readonly movieSearchForm = this.formBuilder.group({
        title: "",
        id: "",
        type: ["csfd", Validators.required]
    }, {
        validators: [this.validateForm]
    });
    private searchedType: MovieSource;

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

    public ngOnInit(): void {
    }

    public searchById(id: string | number): void {
        this.loading = true;
        this.moviesHttpService
            .getMovieDetailFromExternalSource(this.movieSearchForm.value.type, String(id))
            .pipe(finalize(() => this.loading = false))
            .subscribe((searchedMovie) => {
                this.movieSearched.emit(searchedMovie);
            }, (error) => this.notificationService.openErrorNotification(error));
    }

    private validateForm(c: FormControl): null | { formValidationError: any } {
        return (c.value.title || c.value.id) ? null : {
            formValidationError: "Title or ID is required"
        };
    }

    private _searchByName(name: string): void {
        this.loading = true;
        this.searchedType = this.movieSearchForm.value.type;
        this.moviesHttpService
            .getMoviesFromExternalSource(this.searchedType, name)
            .pipe(finalize(() => this.loading = false))
            .subscribe((searchedMovie) => {
                this.movieResults = searchedMovie;
            }, (error) => this.notificationService.openErrorNotification(error));
    }
}
