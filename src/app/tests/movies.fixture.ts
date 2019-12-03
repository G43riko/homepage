import {Movie} from "../pages/movies/models/movie.model";
import {AbstractFixture} from "./abstract.fixture";

export class MoviesFixture extends AbstractFixture<Movie> {
    public constructor() {
        super([
            {
                id: 1111,
                imdbId: "TestMovieImdbId",
                csfdId: 2222,
                movieDbId: 333,
                content: "TestMovieContent",
                title: "TestMovieTitle",
                classification: "PG-13",
                titleSk: "TestMovieTitleSk",
                countries: ["SK", "HU"],
                makers: [
                    {
                        name: "Test movie maker1",
                        birthday: "1995-05-23",
                        csfdId: 44444,
                        imdbId: "TestMovieMaker1ImdbId",
                        movieDb: "TestMovieMaker1MoviedbId",
                        avatars: ["TestMovieMaker1Avatar.jpg"],
                    },
                    {
                        name: "Test movie maker2",
                        birthday: "1995-05-23",
                        csfdId: 5555,
                        imdbId: "TestMovieMaker2ImdbId",
                        movieDb: "TestMovieMaker2MoviedbId",
                        avatars: ["TestMovieMaker2Avatar.jpg"],
                    },
                ],
                year: 1999,
                genres: ["akcny", "komedie"],
                rating: 96,
                tags: [],
                saw: false,
                want_see: true,
                avatar: "somAvatar",
                directors: [],
                type: "movie",
                duration: 213,
            },
        ]);

    }

}
