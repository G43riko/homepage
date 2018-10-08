import { Directive, HostListener, Input } from "@angular/core";
import { MovieUtils } from "../movie.util";

interface ArgumentType {
    type: "csfd" | "imdb" | "movieDb";
    id: string;
}

@Directive({
    selector: "[appExternalMaker]",
})
export class ExternalMakerDirective {
    @Input() public appExternalMaker: ArgumentType;

    @HostListener("click", ["$event"])
    public onClick($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        window.open(this.getLink(), "_blank");
    }

    private getLink(): string {
        switch (this.appExternalMaker.type) {
            case "csfd":
                return MovieUtils.getMakerCsfdLink(this.appExternalMaker.id);
            case "imdb":
                return MovieUtils.getMakerImdbLink(this.appExternalMaker.id);
            case "movieDb":
                return MovieUtils.getMakerMovieDbLink(this.appExternalMaker.id);
            default:
                throw new Error("Neznámy typ externej služby: " + this.appExternalMaker.type);
        }
    }

}
