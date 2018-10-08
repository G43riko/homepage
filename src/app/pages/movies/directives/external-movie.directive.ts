import { Directive, HostListener, Input } from "@angular/core";
import { MovieUtils } from "../movie.util";

interface ArgumentType {
    type: "csfd" | "imdb" | "movieDb";
    id: string;
}

@Directive({
    selector: "[appExternalMovie]",
})
export class ExternalMovieDirective {
    @Input() public appExternalMovie: ArgumentType;

    @HostListener("click", ["$event"])
    public onClick($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        window.open(this._getLink(), "_blank");
    }

    private _getLink(): string {
        switch (this.appExternalMovie.type) {
            case "csfd":
                return MovieUtils.getMovieCsfdLink(this.appExternalMovie.id);
            case "imdb":
                return MovieUtils.getMovieImdbLink(this.appExternalMovie.id);
            case "movieDb":
                return MovieUtils.getMovieMovieDbLink(this.appExternalMovie.id);
            default:
                throw new Error("Neznámy typ externej služby: " + this.appExternalMovie.type);
        }
    }

}
