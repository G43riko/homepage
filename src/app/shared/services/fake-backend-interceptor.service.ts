import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, dematerialize, materialize, mergeMap } from "rxjs/operators";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    public constructor() {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        const users: any[] = JSON.parse(localStorage.getItem("users") || "{}") || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            if (request.url.endsWith("/persons/list") && request.method === "GET") {
                return of(new HttpResponse({
                    status: 200, body: [
                        {
                            person_id: "TestPersonId",
                            name: "TestPersonName",
                            surName: "TestPersonSurName",
                            birthday: "1999-11-22",
                            nick: "TestPersonNick",
                            numbers: [],
                            emails: [],
                            accounts: [],
                            address: {},
                        },
                    ],
                }));
            }
            if (request.url.endsWith("/persons/TestPersonId") && request.method === "GET") {
                return of(new HttpResponse({
                    status: 200, body: {
                        person_id: "TestPersonId",
                        name: "TestPersonName",
                        surName: "TestPersonSurName",
                        birthday: "1999-11-22",
                        nick: "TestPersonNick",
                        numbers: [
                            {
                                number: "0905123456",
                                active: true,
                                number_id: "TestPersonNumber1Id",
                            },
                            {
                                number: "0905654321",
                                active: false,
                                number_id: "TestPersonNumber2Id",
                            },
                        ],
                        emails: [
                            {
                                email: "abc@gmail.com",
                                active: true,
                                email_id: "TestPersonEmail1Id",
                            },
                            {
                                email: "gmail@abc.com",
                                active: false,
                                email_id: "TestPersonEmail2Id",
                            },
                        ],
                        accounts: [
                            {
                                type: "FACEBOOK",
                                userName: "TestPersonAccountFbUserName",
                                active: true,
                                link: "TestPersonAccountFbLink",
                                account_id: "TestPersonAccountFbId",
                            }, {
                                type: "LINKEDIN",
                                userName: "TestPersonAccountLIUserName",
                                active: true,
                                link: "TestPersonAccountLILink",
                                account_id: "TestPersonAccountLIId",
                            },
                        ],
                        gender: "WOMAN",
                        address: {
                            country: "SK",
                            city: "TestPersonAddressCity",
                            street: "TestPersonAddressStreet",
                            streetNumber: "TestPersonAddressStreetNumber",
                        },
                    },
                }));
            }

            if (request.url.match(/\/movies\/list/g) && request.method === "GET") {
                return of(new HttpResponse({
                    status: 200, body: [
                        {
                            movie_id: "TestMovieId",
                            imdb_id: "TestMovieImdbId",
                            csfd_id: "TestMovieCsfdId",
                            moviedb_id: "TestMovieMovieDbId",
                            title: "TestMovieTitle",
                            title_sk: "TestMovieTitleSk",
                            year: "1999",
                            genres: ["akcny", "komedie"],
                            classification: "PG-13",
                            rating: "96%",
                            duration: 213,
                        },
                    ],
                }));
            }
            if (request.url.endsWith("/movies/TestMovieId") && request.method === "GET") {
                return of(new HttpResponse({
                    status: 200, body: {
                        movie_id: "TestMovieId",
                        imdb_id: "TestMovieImdbId",
                        csfd_id: "TestMovieCsfdId",
                        moviedb_id: "TestMovieMovieDbId",
                        content: "TestMovieContent",
                        title: "TestMovieTitle",
                        classification: "PG-13",
                        title_sk: "TestMovieTitleSk",
                        countries: ["SK", "HU"],
                        makers: [
                            {
                                name: "Test movie maker1",
                                birthday: "1995-05-23",
                                csfd: "TestMovieMaker1CsfdId",
                                imdb: "TestMovieMaker1ImdbId",
                                movieDb: "TestMovieMaker1MoviedbId",
                                avatar: "TestMovieMaker1Avatar.jpg",
                            },
                            {
                                name: "Test movie maker2",
                                birthday: "1995-05-23",
                                csfd: "TestMovieMaker2CsfdId",
                                imdb: "TestMovieMaker2ImdbId",
                                movieDb: "TestMovieMaker2MoviedbId",
                                avatar: "TestMovieMaker2Avatar.jpg",
                            },
                        ],
                        year: "1999",
                        genres: ["akcny", "komedie"],
                        rating: "96%",
                        duration: 213,
                    },
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
                    status: 200, body: [
                        {
                            artists: "TestSongArtist",
                            title: "TestSongTitle",
                            spotifi_link: "TestSongSpotifyLink",
                            duration: 3511361,
                            popularity: "TestSongPopularity",
                            preview: "https://www.w3schools.com/html/horse.ogg",
                        },
                    ],
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
