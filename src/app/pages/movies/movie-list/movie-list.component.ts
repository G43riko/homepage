import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MoviesService } from "../../../shared/services/movies.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { Paginator } from "../../../shared/utils/Paginator";
import { Movie } from "../models/movie.model";

@Component({
    selector: "app-movie-list",
    templateUrl: "./movie-list.component.html",
    styleUrls: ["./movie-list.component.scss"],
})
export class MovieListComponent implements OnInit {
    public showExternalServices = true;
    public selectedAll          = false;
    public paginator: Paginator<Movie>;
    public searchPattern: string;
    public movieList: Movie[]   = [];

    public constructor(private readonly moviesService: MoviesService,
                       private readonly router: Router,
                       private readonly notificationService: NotificationService) {

    }

    public ngOnInit(): void {
        this.moviesService.getMovies().subscribe((data) => {
            this.paginator = new Paginator(data);
            this.movieList = this.paginator.getList();
        }, (error) => this.notificationService.showErrorMessage(error));
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
}
