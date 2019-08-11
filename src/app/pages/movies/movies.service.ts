import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppConfig } from "../../app.config";
import { AuthService } from "../../shared/auth.service";
import { AbstractHttpService } from "../../shared/services/abstract-http.service";
import { NotificationService } from "../../shared/services/notification.service";
import { Movie } from "./models/movie.model";

const URL = AppConfig.BASE_URL + "/movies";

@Injectable()
export class MoviesService extends AbstractHttpService {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(URL + "/list?limit=1000").pipe(
            catchError(this.handleError<Movie[]>("getPMovies")),
        );
    }

    public getDetail(id: number): Observable<Movie> {
        return this.http.get<Movie>(URL + "/" + id).pipe(
            catchError(this.handleError<Movie>("getDetail")),
        );
    }

    public getCountries(): Observable<string[]> {
        return this.http.get<string[]>(AppConfig.BASE_URL + "/utils/countries/list", {
            headers: this.getHeaders(),
        }).pipe(
            catchError(this.handleError<string[]>("getCountries")),
        );
    }

    public getGenres(): Observable<string[]> {
        return this.http.get<string[]>(URL + "/genres/list", {
            headers: this.getHeaders(),
        }).pipe(
            catchError(this.handleError<string[]>("getGenres")),
        );
    }
}
