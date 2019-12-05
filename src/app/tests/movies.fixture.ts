import {Movie} from "../pages/movies/models/movie.model";
import {ImageUtils} from "../shared/utils/image.utils";
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
                        id: 1,
                        name: "Test movie maker1",
                        birthday: "1995-05-23",
                        csfdId: 21,
                        imdbId: "TestMovieMaker1ImdbId",
                        movieDbId: 31,
                        avatars: [ImageUtils.getTemplate("avatar")],
                    },
                    {
                        id: 2,
                        name: "Test movie maker2",
                        birthday: "1995-05-23",
                        csfdId: 22,
                        imdbId: "TestMovieMaker2ImdbId",
                        movieDbId: 32,
                        avatars: [ImageUtils.getTemplate("avatar")],
                    },
                ],
                year: 1999,
                genres: ["akcny", "komedie"],
                rating: 96,
                tags: [],
                saw: false,
                want_see: true,
                avatar: ImageUtils.getTemplate("avatar"),
                directors: [
                    {
                        id: 3,
                        name: "Test movie director",
                        birthday: "1995-05-23",
                        csfdId: 23,
                        imdbId: "TestMovieDirector1ImdbId",
                        movieDbId: 33,
                        avatars: [ImageUtils.getTemplate("avatar")],
                    },
                ],
                type: "movie",
                duration: 213,
            },
        ]);

    }

}
