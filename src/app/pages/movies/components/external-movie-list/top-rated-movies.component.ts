import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NotificationService } from "../../../../shared/services/notification.service";
import { Movie } from "../../models/movie.model";
import { MovieHttpService } from "../../services/movie-http.service";

@Component({
    selector       : "app-top-rated-movies",
    templateUrl    : "./external-movie-list.component.html",
    styleUrls      : ["./external-movie-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopRatedMoviesComponent {
    private readonly holder = this.movieHttpService.getMovieHolder("top_rated");
    public readonly movies$ = this.holder.movies$;

    public constructor(
        private readonly movieHttpService: MovieHttpService,
        private readonly notificationService: NotificationService,
    ) {
    }

    public trackByFn(index: number, movie: Movie): string {
        return String(movie.id + movie.imdbId + movie.movieDbId + movie.csfdId);
    }

    public onAddMovieClick(movie: Movie): void {
        if (movie.movieDbId) {
            this.movieHttpService.addMovieToDatabaseByMovieDbId(movie.movieDbId).subscribe((createdMovie) => {
                if (!createdMovie) {
                    return this.notificationService.openSuccessNotification("Error during adding movie to database");
                }
                this.notificationService.openSuccessNotification("Movie was added to database");
                movie.id        = createdMovie.id;
                movie.movieDbId = createdMovie.movieDbId;
                movie.imdbId    = createdMovie.imdbId;
            });
        }
    }

    public onLoadNextClick(): void {
        this.holder.loadMore();
    }
}
