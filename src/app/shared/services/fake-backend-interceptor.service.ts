import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse,} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AbstractRestApiHandler, SimpleMemoryDatabaseService} from "@g43/common";
import {Observable, of} from "rxjs";
import {delay, dematerialize, materialize, mergeMap, tap} from "rxjs/operators";
import {MakersFixture} from "../../pages/movies/tests/maker.fixture";
import {MoviesFixture} from "../../pages/movies/tests/movies.fixture";
import {PersonsFixture} from "../../pages/person/tests/personsFixture";
import {SongListMock, UserDetailMock} from "../../tests/mock.data";

const data: any[] = [...UserDetailMock];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    private readonly movieRestApi = new AbstractRestApiHandler(new SimpleMemoryDatabaseService(new MoviesFixture()), "movies");
    private readonly makerRestApi = new AbstractRestApiHandler(new SimpleMemoryDatabaseService(new MakersFixture()), "movies/maker");
    private readonly personRestApi = new AbstractRestApiHandler(new SimpleMemoryDatabaseService(new PersonsFixture()), "persons");

    public constructor() {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            if (request.url.indexOf("assets/") >= 0 && request.method === "GET") {
                return next.handle(request);
            }

            const personsResult = this.personRestApi.use(request);
            if (personsResult) {
                return personsResult.pipe(tap((e) => console.log("persons: ", request.url, e)));
            }
            const makersResult = this.makerRestApi.use(request);
            if (makersResult) {
                return makersResult.pipe(tap((e) => console.log("makers: ", request.url, e)));
            }
            const moviesResult = this.movieRestApi.use(request);
            if (moviesResult) {
                return moviesResult.pipe(tap((e) => console.log("movies: ", request.url, e)));
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
