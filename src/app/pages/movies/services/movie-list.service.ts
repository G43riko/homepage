import { Injectable, OnDestroy } from "@angular/core";
import { StringUtils } from "gtools";
import { BehaviorSubject, Subject } from "rxjs";
import { map, shareReplay, switchMap } from "rxjs/operators";
import { ApiPaginator } from "../../../shared/utils/ApiPaginator";
import { Movie } from "../models/movie.model";
import { MovieHttpService } from "./movie-http.service";

@Injectable()
export class MovieListService implements OnDestroy{
    private readonly killer$ = new Subject();
    private readonly previewTypeSource$ = new BehaviorSubject<"table" | "grid">("table");
    public readonly previewType$        = this.previewTypeSource$.asObservable();

    private readonly searchPatternSource$ = new BehaviorSubject<string>("");
    private readonly searchPattern$        = this.searchPatternSource$.asObservable();

    private readonly paginator = new ApiPaginator(this.movieHttpService, {pageSize: 10});


    public readonly movieList$ = this.paginator.list$;

    public movieList2$ = this.paginator.list$.pipe(
        switchMap((movies) => this.searchPattern$.pipe(
            map((searchPattern) => {
                return this.filterMoviesByPattern(movies, searchPattern);
            })
        )),

        shareReplay<Movie[]>(1),
    );

    public constructor(
        private readonly movieHttpService: MovieHttpService
    ) {
    }

    public ngOnDestroy(): void {
        this.killer$.next();
        this.killer$.complete();
        this.paginator.cleanUp();
    }

    private filterMoviesByPattern(movies: Movie[], pattern: string): Movie[] {
        if (!pattern) {
            return movies;
        }

        const transformedPattern = StringUtils.transformToBasicFormat(pattern);

        return movies.filter((movie) => {
            return StringUtils.contains(StringUtils.transformToBasicFormat(movie.title || ""), transformedPattern) ||
                StringUtils.contains(StringUtils.transformToBasicFormat(movie.titleSk || ""), transformedPattern);
        });
    }

    public loadNext(count?: number): void {
        this.paginator.loadNext(count);
    }

    public setPreviewType(type: "table" | "grid"): void {
        this.previewTypeSource$.next(type);
        this.paginator.firstPage();
    }

    public searchPatternChange(value: string): void {
        this.searchPatternSource$.next(value);
        this.paginator.search(value);
    }
}
