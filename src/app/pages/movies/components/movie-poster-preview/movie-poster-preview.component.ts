import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    Renderer2
} from "@angular/core";
import { Movie } from "../../models/movie.model";
import { MovieService } from "../../services/movie.service";

@Component({
    selector   : "app-movie-poster-preview",
    templateUrl: "./movie-poster-preview.component.html",
    styleUrls  : ["./movie-poster-preview.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host       : {
        class: "movie-wrapper",
        "[class.not-exists]": "notExists"
    }
})
export class MoviePosterPreviewComponent {
    @Input() public movie: Movie;
    @Input() public notExists: boolean;

    public constructor(public readonly movieService: MovieService,
                       private readonly changeDetectorRef: ChangeDetectorRef,
                       private readonly renderer2: Renderer2,
                       private readonly elementRef: ElementRef) {
    }
    @HostListener("click", ["$event.target"])
    private onClick(): void {
        this.renderer2.addClass(this.elementRef.nativeElement, "opened");
        this.changeDetectorRef.detectChanges();
    }

    @HostListener("mouseleave", ["$event.target"])
    private onMouseLeave(): void {
        this.renderer2.removeClass(this.elementRef.nativeElement, "opened");
        this.changeDetectorRef.detectChanges();
    }

}
