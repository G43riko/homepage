import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from "@angular/core";
import {map, switchMap} from "rxjs/operators";
import {NotificationService} from "../../../../shared/services/notification.service";
import {MovieSource} from "../../models/movie-source.type";
import {Movie} from "../../models/movie.model";
import {MovieHttpService} from "../../services/movie-http.service";

function assignNotEmpty<T>(objA: T, objB: T): T {
    const result: T = Object.assign({}, objA);

    Object.entries(objB).forEach(([key, value]) => {
        if(value !== null && value !== "" && typeof value !== "undefined") {
            result[key as keyof T] = value;
        }
    });

    return result;
}

@Component({
    selector       : "app-top-rated-movies",
    templateUrl    : "./external-movie-list.component.html",
    styleUrls      : ["./external-movie-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopRatedMoviesComponent {
    private readonly holder = this.movieHttpService.getMovieHolder("top_rated", MovieSource.movieDb);

    public readonly movieDetails$ = this.holder.movies$.pipe(
        switchMap((movies) => {
            return this.movieHttpService.bulkSearchMovies("movieDbId", movies.filter((m) => !m.id).map((movie) => movie.movieDbId)).pipe(
                map((movieDetails) => movieDetails.map((detail, index) => assignNotEmpty(detail, movies[index])))
            );
        }),
    );

    public constructor(
        private readonly movieHttpService: MovieHttpService,
        private readonly notificationService: NotificationService,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    public trackByFn(index: number, movie: Movie): string {
        return movie.id + movie.imdbId + movie.movieDbId + movie.csfdId;
    }

    public onAddMovieClick(movie: Movie): void {
        if (!movie.movieDbId) {
            return this.notificationService.openErrorNotification("Movie is missing 'movieDbId'");
        }
        this.movieHttpService.addMovieToDatabaseByExternalIdId(MovieSource.movieDb, movie.movieDbId).subscribe((createdMovie) => {
            if (!createdMovie) {
                return this.notificationService.openErrorNotification("Error during adding movie to database");
            }
            this.notificationService.openSuccessNotification("Movie was added to database");
            movie.id = createdMovie.id;
            movie.movieDbId = createdMovie.movieDbId;
            movie.imdbId = createdMovie.imdbId;
            this.changeDetectorRef.markForCheck();
        });
    }

    public onLoadNextClick(): void {
        this.holder.loadMore();
    }
}
