import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import { AuthService } from "./auth.service";
import {NotificationService} from "./notification.service";

@Injectable()
export abstract class AbstractHttpService<S = any> {
    protected constructor(protected readonly http: HttpClient,
                          private readonly _authService: AuthService,
                          private readonly _notificationService: NotificationService,
                          private readonly URL?: string) {
    }

    protected handleError<T>(operation = "operation", result?: T): (error: any) => Observable<T> {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            this._notificationService.openErrorNotification(error);

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message || error}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    public getDetail(id: number): Observable<S> {
        return this.http.get<S>(this.URL + "/" + id).pipe(
            catchError(this.handleError<S>("getDetail"))
        );
    }

    public getList(count: number, offset = 0, key?: string): Observable<S[]> {
        if (key) {
            return this.http.get<S[]>(`${this.URL}/quick-search/${key}?count=${count}&offset=${offset}`).pipe(
                catchError(this.handleError<S[]>("search"))
            );
        }

        return this.http.get<S[]>(`${this.URL}/?count=${count}&offset=${offset}`).pipe(
            catchError(this.handleError<S[]>("search"))
        );
    }

    protected getHeaders(): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append("Content-type", "application/json");
        headers = headers.append("x-access-token", this._authService.getToken());
        headers = headers.append("__auth_token__", "3KJNUIHZobnkN3ZIa66ddsnsmvslDDD88d");

        // headers.append("cache-control", "no-cache");
        return headers;
    }
}
