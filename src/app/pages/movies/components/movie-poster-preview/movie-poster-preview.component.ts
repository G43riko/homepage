import {Component, ElementRef, HostListener, Input, OnInit} from "@angular/core";
import {Movie} from "../../models/movie.model";
import {MovieService} from "../../movie.service";

@Component({
    selector: "app-movie-poster-preview",
    templateUrl: "./movie-poster-preview.component.html",
    styleUrls: ["./movie-poster-preview.component.scss"],
    host: {
        class: "movie-wrapper",
    },
})
export class MoviePosterPreviewComponent implements OnInit {
    @Input() public movie: Movie;

    public constructor(private readonly movieService: MovieService,
                       private readonly elementRef: ElementRef) {
    }

    public ngOnInit(): void {
    }

    @HostListener("click", ["$event.target"])
    private onClick(): void {
        this.elementRef.nativeElement.classList.add("opened");
    }

    @HostListener("mouseleave", ["$event.target"])
    private onMouseLeave(): void {
        this.elementRef.nativeElement.classList.remove("opened");
    }

}
