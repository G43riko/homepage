import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {AppConfig} from "../../app.config";
import {AuthService} from "../../shared/auth.service";
import {AbstractHttpService} from "../../shared/services/abstract-http.service";
import {NotificationService} from "../../shared/services/notification.service";
import {PaginatorService} from "../../shared/utils/paginable-service.model";
import {Maker} from "./models/maker.model";
import {MovieSource} from "./models/movie-source.type";
import {MovieType} from "./models/movie-type.type";
import {Movie} from "./models/movie.model";

const URL = AppConfig.BASE_URL + "/movies";
const URL_EXTERNAL = AppConfig.BASE_URL + "/external-movies";

@Injectable()
export class MovieHttpService extends AbstractHttpService implements PaginatorService<Movie> {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(URL + "/?limit=1000").pipe(
            catchError(this.handleError<Movie[]>("getMovies")),
        );
    }

    public getMakers(): Observable<Maker[]> {
        return this.http.get<Maker[]>(URL + "/makers/?limit=1000").pipe(
            catchError(this.handleError<Maker[]>("getMakers")),
        );
    }

    public getMakerDetail(makerId: string): Observable<Maker> {
        return this.http.get<Maker>(URL + "/maker/" + makerId).pipe(
            catchError(this.handleError<Maker>("getMakerDetail")),
        );
    }

    public getDetail(id: number): Observable<Movie> {
        return this.http.get<Movie>(URL + "/" + id).pipe(
            catchError(this.handleError<Movie>("getDetail")),
        );
    }

    public getGenres(): Observable<string[]> {
        return this.http.get<string[]>(URL + "/genres", {
            headers: this.getHeaders(),
        }).pipe(
            catchError(this.handleError<string[]>("getGenres")),
        );
    }

    public getList(count: number, offset = 0, key?: string): Observable<Movie[]> {
        if (key) {
            return this.http.get<Movie[]>(`${URL}/quick-search/${key}?count=${count}&offset=${offset}`).pipe(
                catchError(this.handleError<Movie[]>("searchMovies")),
            );
        }
        return this.http.get<Movie[]>(`${URL}/list?count=${count}&offset=${offset}`).pipe(
            catchError(this.handleError<Movie[]>("getList")),
        );
    }

    public getCount(): Observable<number> {
        return this.http.get<number>(URL + "/count").pipe(
            catchError(this.handleError<number>("getCount")),
        );
    }

    public getMoviesFromExternalSource(type: MovieSource, key: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(URL_EXTERNAL + "/search/" + type + "/" + key + "?transform=true").pipe(
            catchError(this.handleError<Movie[]>("getMoviesFromExternalSource")),
        );
    }

    public getMovieDetailFromExternalSource(source: MovieSource, id: string, type: MovieType = "movie"): Observable<Movie> {
        return this.http.get<Movie>(URL_EXTERNAL + "/detail/" + source + "/" + id + "?transform=true&type=" + type).pipe(
            catchError(this.handleError<Movie>("getMovieDetailFromExternalSource")),
        );
    }
}
