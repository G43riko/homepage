import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
    selector: "movie-index",
    template: `
        <button *menuItem="'end'" (click)=" drawer.toggle()" mat-icon-button title="Toggle sidenav">
            <mat-icon>filter_alt</mat-icon>
        </button>
        <ng-container *menuItem="'start'">
            <a  mat-button routerLink="/movies">Popular</a>
            <a  mat-button routerLink="top-rated">Top rated</a>
            <a  mat-button routerLink="list">Movies</a>
            <a  mat-button routerLink="makers">Makers</a>
            <a  mat-button routerLink="users/csfd">CSFD User</a>
        </ng-container>

        <mat-sidenav-container >
            <mat-sidenav #drawer mode="push" position="end">
                This is filter
            </mat-sidenav>
            <mat-sidenav-content>
                <router-outlet></router-outlet>
            </mat-sidenav-content>
        </mat-sidenav-container>

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieIndex {
}
