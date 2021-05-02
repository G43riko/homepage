import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { catchError, scan, shareReplay, startWith, switchMap, tap } from "rxjs/operators";
import { AppStaticConfig } from "../../../appStaticConfig";
import { AbstractHttpService } from "../../../shared/services/abstract-http.service";
import { AuthService } from "../../../shared/services/auth.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { Maker } from "../models/maker.model";
import { Movie } from "../models/movie.model";

const URL = AppStaticConfig.BASE_URL + "/v2/external-movies";

@Injectable()
export class ExternalMovieService extends AbstractHttpService {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService, URL);
    }

    public getCsfdUserMovies(userId: number): {
        movies$: Observable<Movie[]>,
        loading$: Observable<boolean>,
        loadMore(): void,
        cleanUp(): void,
    } {
        const source$  = new Subject();
        const loading$ = new BehaviorSubject<boolean>(false);

        return {
            movies$ : source$.pipe(
                startWith(undefined),
                tap(() => loading$.next(true)),
                switchMap((_, index) => this.getCsfdUserDetail(userId, index + 1)),
                scan((acc, curr) => [...acc, ...curr], [] as Movie[]),
                tap(() => loading$.next(false)),
                shareReplay(1),
            ),
            loading$: loading$.asObservable(),
            loadMore: () => source$.next(),
            cleanUp : () => {
                source$.complete();
                loading$.complete();
            },
        };
    }

    public getCsfdUserDetail(id: number | string, page = 1): Observable<any> {
        return this.http.get<Maker[]>(`${URL}/csfd-user-movies/${id}?page=${page}&transform=dto`)
                   .pipe(
                       catchError(this.handleError<any>("getCsfdUserDetail"))
                   );
    }
}
