import {ChangeDetectionStrategy, Component} from "@angular/core";
import {MovieGuiService} from "../services/movie-gui.service";

@Component({
    selector: "movie-index",
    template: `
        <ng-container *menuItem="'start'">
            <a  mat-button routerLink="/movies">Popular</a>
            <a  mat-button routerLink="top-rated">Top rated</a>
            <a  mat-button routerLink="list">Movies</a>
            <a  mat-button routerLink="makers">Makers</a>
            <a  mat-button routerLink="users/csfd">CSFD User</a>
            <a  mat-button routerLink="incomplete">Incomplete</a>
        </ng-container>

        <mat-sidenav-container >
            <mat-sidenav mode="push" [opened]="filterOpened$ | async" position="end">
                <movie-filter></movie-filter>
            </mat-sidenav>
            <mat-sidenav-content>
                <router-outlet></router-outlet>
            </mat-sidenav-content>
        </mat-sidenav-container>

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieIndex {
    public readonly filterOpened$ = this.movieGuiService.movieFilterOpened$;
    public constructor(
        private readonly movieGuiService: MovieGuiService,
    ) {
    }
}
