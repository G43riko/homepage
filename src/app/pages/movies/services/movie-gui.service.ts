import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class MovieGuiService<T extends {} = {}> {
    private readonly movieFilterOpenedSource$ = new BehaviorSubject<boolean>(false);
    public readonly movieFilterOpened$ = this.movieFilterOpenedSource$.asObservable();

    private readonly filterSource$ = new BehaviorSubject<T>({} as T);
    public readonly filter$ = this.filterSource$.asObservable();

    public setMovieFilterOpened(opened: boolean): void {
        this.movieFilterOpenedSource$.next(opened);
    }

    public toggleMovieFilterOpened(): void {
        this.movieFilterOpenedSource$.next(!this.movieFilterOpenedSource$.value);
    }

    public clearFilter(): void {
        this.filterSource$.next({} as T);
    }

    public patchFilter(value: Partial<T>): void {
        this.filterSource$.next(Object.assign({}, this.filterSource$.value, value));
    }

    public setFilter<S extends keyof T>(key: S, value: T[S]): void {
        this.filterSource$.next(Object.assign({}, this.filterSource$.value, {[key]: value}));
    }
}
