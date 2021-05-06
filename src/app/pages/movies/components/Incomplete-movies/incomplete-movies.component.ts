import {ChangeDetectionStrategy, Component} from "@angular/core";
import {Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";
import {TableConfig} from "../../../../shared/components/abstract-table/table-config";
import {Movie} from "../../models/movie.model";
import {MovieHttpService} from "../../services/movie-http.service";

@Component({
    selector: "incomplete-movies",
    template: `
        <mat-tab-group>
            <mat-tab *ngFor="let item of data" [label]="item.label">
                <ng-template matTabContent>
                    <app-abstract-table [data]="getMoviesWithout(item.property) | async"
                                        [tableConfig]="movieConfig"
                    >
                        <app-external-links *tableColumn="'external', let row" type="movie" [holder]="row"></app-external-links>
                        <button *tableColumn="'detail'; let row"
                                color="primary"
                                [routerLink]="'/movies/' + row.id"
                                [matTooltip]="'movies.openDetail' | translate"
                                mat-icon-button
                        >
                            <mat-icon>chevron_right</mat-icon>
                        </button>
                    </app-abstract-table>
                </ng-template>
            </mat-tab>
        </mat-tab-group>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncompleteMoviesComponent {
    public readonly movieConfig: TableConfig<Movie & { external: unknown, detail: unknown }> = {
        noDataLabel: "There is no movies with missing attribute",
        columns: [
            {
                label: "Title",
                name: "title",
                customContent: (movie) => movie.titleSk || movie.title,
            },
            {
                label: "Year",
                name: "year",
            },
            {
                label: "Duration",
                name: "duration",
            },
            {
                name: "external"
            },
            {
                name: "detail"
            }
        ]
    };
    public readonly data: {label: string, property: keyof Movie}[] = [
        {
            label: "Csfd",
            property: "csfdId"
        },
        {
            label: "MovieDb",
            property: "movieDbId"
        },
        {
            label: "Imdb",
            property: "imdbId"
        },
        {
            label: "Year",
            property: "year"
        },
        {
            label: "Duration",
            property: "duration"
        },
        {
            label: "Genres",
            property: "genres"
        },
        {
            label: "Content",
            property: "content"
        },
        {
            label: "Countries",
            property: "countries"
        },
    ];

    private readonly storedData: {[key in keyof Movie]?: Observable<Movie[]>} = {};

    public constructor(private readonly movieHttpService: MovieHttpService) {
    }

    public getMoviesWithout(key: keyof Movie): Observable<Movie[]> {
        if (this.storedData[key]) {
            return this.storedData[key] as Observable<Movie[]>;
        }

        const data = this.movieHttpService.getMoviesWithout(key).pipe(
            shareReplay(1),
        );
        this.storedData[key] = data;

        return data;
    }
}
