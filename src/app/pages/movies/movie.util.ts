const CSFD_BASE_URL = "https://www.csfd.cz/";
const IMDB_BASE_URL = "https://www.imdb.com/";
const MOVIE_DB_BASE_URL = "https://www.themoviedb.org/";

export class MovieUtils {
    public static getMakerCsfdLink(csfdId: string): string {
        return CSFD_BASE_URL + "tvurce/" + csfdId;
    }

    public static getMakerImdbLink(imdbId: string): string {
        return IMDB_BASE_URL + "givenName/" + imdbId;
    }

    public static getMakerMovieDbLink(movieDbId: string): string {
        return MOVIE_DB_BASE_URL + "person/" + movieDbId;
    }

    public static getMovieCsfdLink(csfdId: string): string {
        return CSFD_BASE_URL + "film/" + csfdId;
    }

    public static getMovieImdbLink(imdbId: string): string {
        return IMDB_BASE_URL + "title/" + imdbId;
    }

    public static getMovieMovieDbLink(movieDbId: string): string {
        return MOVIE_DB_BASE_URL + "movie/" + movieDbId;
    }

}
