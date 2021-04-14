import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { TableConfig } from "../../../../shared/components/abstract-table/table-config";
import { NotificationService } from "../../../../shared/services/notification.service";
import { ExternalMovieService } from "../../services/external-movie.service";

@Component({
    selector: "app-csfd-user-detail",
    templateUrl: "./csfd-user-detail.component.html",
    styleUrls: ["./csfd-user-detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CsfdUserDetailComponent implements OnInit {
    public loading = false;
    public userDetail: any;
    public readonly userMovies = new BehaviorSubject<any[]>([]);
    public readonly userMoviesConfig: TableConfig = {
        selection: "multi",
        paginateOptions: [5, 10, 20, 50, 100],
        stickyHeader: true,
        paginator: false,
        columns: [
            {
                name: "title",
                label: "Názov"
            },
            {
                name: "userRating",
                label: "Hodnotenie"
            },
            {
                name: "year",
                label: "Rok",
                customContent: (row) => row.year.replace(/[()]/g, "")
            },
            {
                name: "added",
                label: "Pridané"
            },
            {
                name: "link",
                label: "Odkaz"
            }
        ]
    };
    private actualPage = 1;
    private id: number;

    public constructor(private readonly route: ActivatedRoute,
                       private readonly notificationService: NotificationService,
                       private readonly externalMovieService: ExternalMovieService) {
    }

    public ngOnInit(): void {
        this.route.params.subscribe((data: any) => {
            this.id = data.id;
            this.loading = true;
            this.externalMovieService.getCsfdUserDetail(this.id).subscribe((movies) => {
                this.userMovies.next(movies);
                this.loading = false;
            }, (error) => {
                this.notificationService.openErrorNotification(error);
                this.loading = false;
            });
        }, (error) => this.notificationService.openErrorNotification(error));
    }

    public loadMore(): void {
        this.loading = true;
        this.externalMovieService.getCsfdUserDetail(this.id, ++this.actualPage).subscribe((movies) => {
            this.userMovies.next([...this.userMovies.value, ...movies]);
            this.loading = false;
        }, (error) => {
            this.notificationService.openErrorNotification(error);
            this.loading = false;
        });
    }
}
