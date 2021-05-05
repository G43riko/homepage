import {ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, first, map, shareReplay, switchMap} from "rxjs/operators";
import {TableConfig} from "../../../../shared/components/abstract-table/table-config";
import {NotificationService} from "../../../../shared/services/notification.service";
import {ExternalMovieService} from "../../services/external-movie.service";
import {MovieHttpService} from "../../services/movie-http.service";
import {MovieSource} from "../../models/movie-source.type";
import {Movie} from "../../models/movie.model";

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
    selector       : "app-csfd-user-detail",
    templateUrl    : "./csfd-user-detail.component.html",
    styleUrls      : ["./csfd-user-detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None
})
export class CsfdUserDetailComponent implements OnDestroy {
    public readonly userId$ = this.route.queryParams.pipe(
        map((params) => params.id),
    );
    private readonly moviesHolder$ = this.userId$.pipe(
        filter((id) => id),
        map((id) => this.externalMovieService.getCsfdUserMovies(id)),
        shareReplay(1),
    );

    public readonly loading$ = this.moviesHolder$.pipe(
        switchMap((holder) => holder.loading$),
    );

    public readonly movies$                                                                                                           = this.moviesHolder$.pipe(
        switchMap((holder) => holder.movies$),
        switchMap((movies) => {
            return this.movieHttpService.bulkSearchMovies("csfdId", movies.filter((m) => !m.id).map((movie) => movie.csfdId)).pipe(
                map((movieDetails) => movieDetails.map((detail, index) => assignNotEmpty(detail, movies[index])))
            );
        }),
    );
    public readonly userMoviesConfig: TableConfig<{ title: string, titleSk: string, userRating: unknown, year: string, added: unknown, link: string }> = {
        // selection      : "multi",
        paginateOptions: [5, 10, 20, 50, 100],
        stickyHeader   : true,
        paginator      : false,
        columns        : [
            {
                name : "title",
                label: "Názov",
                customContent: (row) => row.title || row.titleSk,
            },
            {
                name : "userRating",
                label: "Hodnotenie"
            },
            {
                name         : "year",
                label        : "Rok",
                customContent: (row) => row.year
            },
            {
                name : "added",
                label: "Pridané"
            },
            {
                name : "link",
                label: "Odkaz"
            }
        ]
    };

    public constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly notificationService: NotificationService,
        private readonly externalMovieService: ExternalMovieService,
        private readonly movieHttpService: MovieHttpService,
    ) {
    }

    public ngOnDestroy(): void {
        this.moviesHolder$.pipe(
            first()
        ).subscribe((holder) => holder.cleanUp());
    }

    public loadMore(): void {
        this.moviesHolder$.pipe(
            first(),
        ).subscribe((holder) => holder.loadMore());
    }

    public onAddMovieToDatabase(movie: Movie): void {
        this.movieHttpService.addMovieToDatabaseByExternalIdId(MovieSource.csfd, movie.csfdId).subscribe((createdMovie) => {
            if (!createdMovie) {
                return this.notificationService.openSuccessNotification("Error during adding movie to database");
            }
            this.notificationService.openSuccessNotification("Movie was added to database");
            movie.id = createdMovie.id;
            movie.movieDbId = createdMovie.movieDbId;
            movie.csfdId = createdMovie.csfdId;
            movie.imdbId = createdMovie.imdbId;
        });
    }

    public onSearch(id: string): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {id},
            queryParamsHandling: "merge",
            // skipLocationChange: true
        });
    }
}
