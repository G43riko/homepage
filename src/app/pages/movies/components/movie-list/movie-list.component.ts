import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../shared/services/notification.service";
import {ApiPaginator} from "../../../../shared/utils/ApiPaginator";
import {Movie} from "../../models/movie.model";
import {MovieHttpService} from "../../movie-http.service";
import {MovieService} from "../../movie.service";

@Component({
    selector: "app-movie-list",
    templateUrl: "./movie-list.component.html",
    styleUrls: ["./movie-list.component.scss"],
})
export class MovieListComponent implements OnInit {
    public showExternalServices = true;
    public previewType: "table" | "grid" = "table";
    public selectedAll = false;
    // public paginator: Paginator<Movie>;
    public readonly paginator: ApiPaginator<Movie>;
    public searchPattern: string;

    public constructor(movieHttpService: MovieHttpService,
                       private readonly router: Router,
                       public readonly movieService: MovieService,
                       private readonly notificationService: NotificationService) {
        this.paginator = new ApiPaginator(movieHttpService, {pageSize: 10});

    }

    public ngOnInit(): void {
    }

    public setPreviewType(previewType: "table" | "grid"): void {
        this.previewType = previewType;
        this.paginator.firstPage();
        if (previewType === "grid") {
            setTimeout(() => {
                const io = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.paginator.loadNext(10);
                            console.log("intersecting");
                        }
                    });
                });
                io.observe(document.querySelector(".next-loader") as Element);
            }, 10);
        }
    }

    public selectAll(checkbox: HTMLInputElement): void {
        console.log(checkbox);
        const elements: NodeListOf<any> = document.getElementsByName("personSelector");
        for (let i = 0; i < elements.length; i++) {
            elements[i].checked = !this.selectedAll;
        }
    }

    public showDetail(movie_id: number | string): void {
        this.router.navigateByUrl("/movies/" + movie_id);
    }

    public createNew(): void {
        this.router.navigateByUrl("/movies/new");
    }
}
