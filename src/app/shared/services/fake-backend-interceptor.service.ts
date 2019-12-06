import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AbstractRestApiHandler, SimpleMemoryDatabaseService} from "@g43/common";
import {Observable, of} from "rxjs";
import {delay, dematerialize, materialize, mergeMap, tap} from "rxjs/operators";
import {MakersFixture} from "../../tests/maker.fixture";
import {SongListMock, UserDetailMock, UserListMock} from "../../tests/mock.data";
import {MoviesFixture} from "../../tests/movies.fixture";

const data: any[]  = [...UserDetailMock];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    private readonly movieRestApi = new AbstractRestApiHandler(new SimpleMemoryDatabaseService(new MoviesFixture()), "movies");
    private readonly makerRestApi = new AbstractRestApiHandler(new SimpleMemoryDatabaseService(new MakersFixture()), "movies/maker");
    public constructor() {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            if (request.url.indexOf("assets/") >= 0 && request.method === "GET") {
                return next.handle(request);
            }

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
            const makersResult = this.makerRestApi.use(request);
            if (makersResult) {
                return makersResult.pipe(tap((e) => console.log(request.url, e)));
            }
            const moviesResult = this.movieRestApi.use(request);
            if (moviesResult) {
                return moviesResult.pipe(tap((e) => console.log(request.url, e)));
            }

            if (request.url.endsWith("/utils/countries") && request.method === "GET") {
                return of(new HttpResponse({
                    status: 200, body: [
                        "SK", "HU", "USA",
                    ],
                }));
            }

            if (request.url.endsWith("/movies/genres") && request.method === "GET") {
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
            console.log("vola sa to", request.url, request.method);
            // if (request.url.match(/.*/g)) {
            //     console.log("vola sa to", request.url, request.method);
            //     return of(new HttpResponse({status: 200, body: {}}));
            // }

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
