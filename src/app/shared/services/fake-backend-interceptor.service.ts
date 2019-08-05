import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {delay, dematerialize, materialize, mergeMap} from "rxjs/operators";
import {MovieDetailMock, MovieListMock, SongListMock, UserDetailMock, UserListMock} from "../../tests/mock.data";

const data: any[]  = [...UserDetailMock];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    public constructor() {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            if (request.url.endsWith("/persons/list") && request.method === "GET") {
                return of(new HttpResponse({
                    status: 200, body: [...UserListMock, ...UserListMock, ...UserListMock, ...UserListMock, ...UserListMock, ...UserListMock, ...UserListMock, ...UserListMock],
                }));
            }
            if (request.url.match(/\/persons\/[a-zA-Z0-9]+$/) && request.method === "GET") {
                const splitUrl = request.url.split("/");
                const id = splitUrl[splitUrl.length - 1];
                return of(new HttpResponse({
                    status: 200, body: data.find((person) => String(person.person_id) === id),
                }));
            }
            if (request.url.match(/\/persons\/[a-zA-Z0-9]+$/) && request.method === "PUT") {
                const splitUrl = request.url.split("/");
                const id = splitUrl[splitUrl.length - 1];
                data.splice(data.findIndex((person) => String(person.person_id) === id), 1);
                data.push(request.body);
                return of(new HttpResponse({
                    status: 200, body: request.body,
                }));
            }
            if (request.url.endsWith("/persons") && request.method === "POST") {
                const newId = Object.keys(data).length;
                data[newId] = {
                    ...request.body,
                    person_id: newId,
                };
                return of(new HttpResponse({
                    status: 200, body: data[newId],
                }));
            }

            if (request.url.match(/\/movies\/list/g) && request.method === "GET") {
                return of(new HttpResponse({
                    status: 200, body: MovieListMock,
                }));
            }
            if (request.url.endsWith("/movies/TestMovieId") && request.method === "GET") {
                return of(new HttpResponse({
                    status: 200, body: MovieDetailMock,
                }));
            }

            if (request.url.endsWith("/utils/countries/list") && request.method === "GET") {
                return of(new HttpResponse({
                    status: 200, body: [
                        "SK", "HU", "USA",
                    ],
                }));
            }

            if (request.url.endsWith("/movies/genres/list") && request.method === "GET") {
                return of(new HttpResponse({
                    status: 200, body: [
                        "akcny", "komedie", "krimy", "thriller",
                    ],
                }));
            }

            if (request.url.endsWith("/songs/list") && request.method === "GET") {
                return of(new HttpResponse({
                    status: 200, body: SongListMock,
                }));
            }

            if (request.url.match(/.*/g)) {
                console.log("vola sa to", request.url, request.method);
                return of(new HttpResponse({status: 200, body: {}}));
            }

            // pass through any requests not handled above
            return next.handle(request);

        })).pipe(materialize()).pipe(delay(500)).pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true,
};
