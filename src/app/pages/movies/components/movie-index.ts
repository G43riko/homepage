import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector       : "movie-index",
    template       : `
        <mat-tab-group class="tab-custom-overflow">
            <mat-tab label="Popular">
                <ng-template matTabContent>
                    <app-popular-movies></app-popular-movies>
                </ng-template>
            </mat-tab>
            <mat-tab label="Top rated">
                <ng-template matTabContent>
                    <app-top-rated-movies></app-top-rated-movies>
                </ng-template>
            </mat-tab>
            <mat-tab label="Movies">
                <ng-template matTabContent>
                    <app-movie-list></app-movie-list>
                </ng-template>
            </mat-tab>
            <!--            <mat-tab label="Makers">-->
            <!--                <ng-template matTabContent>-->
            <!--                    <app-movie-makers></app-movie-makers>-->
            <!--                </ng-template>-->
            <!--            </mat-tab>-->
        </mat-tab-group>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieIndex {

}
