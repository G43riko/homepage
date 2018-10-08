import { Pipe, PipeTransform } from "@angular/core";
import { StringUtils } from "gtools";
import { Movie } from "../models/movie.model";

@Pipe({
    name: "movieFilter",
})
export class MovieFilterPipe implements PipeTransform {
    public transform(movies: Movie[], pattern: string): Movie[] {
        if (!pattern) {
            return movies;
        }
        const transformedPattern = StringUtils.transformToBasicFormat(pattern);
        return movies.filter((movie) => {
            return StringUtils.contains(StringUtils.transformToBasicFormat(movie.title), transformedPattern) ||
                StringUtils.contains(StringUtils.transformToBasicFormat(movie.title_sk), transformedPattern);
        });
    }
}
