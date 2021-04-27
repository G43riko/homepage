import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AbstractDetailComponent } from "../../../../shared/components/abstract-detail.component";
import { Roles } from "../../../../shared/enums/roles.enum";
import { AuthService } from "../../../../shared/services/auth.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { MovieSource } from "../../models/movie-source.type";
import { Movie } from "../../models/movie.model";
import { MovieHttpService } from "../../services/movie-http.service";
import { MovieService } from "../../services/movie.service";

@Component({
    selector: "app-movie-detail",
    templateUrl: "./movie-detail.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ["./movie-detail.component.scss"]
})
export class MovieDetailComponent extends AbstractDetailComponent<Movie, MovieHttpService> implements OnInit {
    public readonly Roles = Roles;
    public readonly MovieSource = MovieSource;


    public constructor(route: ActivatedRoute,
                       router: Router,
                       public readonly authService: AuthService,
                       formBuilder: FormBuilder,
                       notificationService: NotificationService,
                       public readonly movieService: MovieService,
                       httpService: MovieHttpService) {
        super(formBuilder, route, router, httpService, notificationService, "movies");
    }

    public ngOnInit(): void {
        this.initialization();
    }

    public setDetail(movie: Movie): void {
        this.selectedDetail = movie;
        this.detailForm.patchValue({
            ...movie,
            year: new Date(movie.year, 0, 1)
        });
    }

    protected createForm(): FormGroup {
        return this.formBuilder.group({
            saw: [false],
            wantSee: [true],
            year: [2000, [Validators.minLength(4), Validators.maxLength(4), Validators.min(1880)]],
            content: [""],
            csfdId: [""],
            imdbId: [""],
            makers: [[]],
            type: ["movie"],
            movieDbId: [""],
            duration: [0, Validators.min(0)],
            rating: [0, [Validators.min(0), Validators.min(100)]],
            countries: [[]],
            genres: [[]],
            avatar: [[]],
            title: ["", [Validators.required, Validators.minLength(3)]],
            titleSk: [""]
        });
    }
}
