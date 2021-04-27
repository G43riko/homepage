import { Pipe, PipeTransform } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { MovieSource } from "../../models/movie-source.type";
import { Movie } from "../../models/movie.model";
import { MovieHttpService } from "../../services/movie-http.service";

@Pipe({
    name: "isNotInLibrary"
})
export class IsNotInLibraryPipe implements PipeTransform {
    public constructor(
        private readonly movieHttpService: MovieHttpService,
    ) {
    }
    public transform(movie: Movie): Observable<boolean> {
        if(movie.movieDbId) {
            return this.movieHttpService.getDetailByExternalId(MovieSource.movieDb, movie.movieDbId).pipe(
                map((result) => !result)
            );
        }

        return of(true);
    }
}
