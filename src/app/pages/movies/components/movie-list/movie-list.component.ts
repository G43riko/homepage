import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {TableConfig} from "../../../../shared/components/abstract-table/table-config";
import {ImageDialogComponent} from "../../../../shared/components/image-dialog/image-dialog.component";
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

    public movieData: Observable<Movie[]>;
    public readonly movieConfig: TableConfig = {
        selection: "multi",
        paginateOptions: [5, 10, 20, 50, 100],
        pageSize: 10,
        stickyEnd: 7,
        paginator: false,
        columns: [
            {
                name: "title",
                label: "Názov",
            },
            {
                name: "directors",
                label: "Režisér",
                customContent: (row: Movie) => row.directors.map((director) => director.name).join(", "),
            },
            {
                name: "year",
                label: "Rok",
            },
            {
                name: "rating",
                label: "Hodnotenie",
                customContent: (row: Movie) => row.rating + " %",
            },
            {
                name: "duration",
                label: "Dĺžka",
                customContent: (row: Movie) => row.duration + " min",
            },
            {
                name: "genres",
                label: "Žánre",
                customContent: (row: Movie) => row.genres.join(", "),
            },
            {
                name: "countries",
                label: "Krajny",
                customContent: (row: Movie) => row.countries.join(", "),
            },
            {
                name: "external",
                label: "",
            },
            {
                name: "detail",
                label: "",
            },
        ],
    };

    public constructor(movieHttpService: MovieHttpService,
                       private readonly dialog: MatDialog,
                       private readonly router: Router,
                       public readonly movieService: MovieService,
                       private readonly notificationService: NotificationService) {
        this.paginator = new ApiPaginator(movieHttpService, {pageSize: 10});
        this.movieData = movieHttpService.getMovies();

    }

    public ngOnInit(): void {
    }

    public openImageDetail(url: string): void {
        this.dialog.open(ImageDialogComponent, {
            data: url,
        });
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

    public createNew(): void {
        this.router.navigateByUrl("/movies/new");
    }
}
