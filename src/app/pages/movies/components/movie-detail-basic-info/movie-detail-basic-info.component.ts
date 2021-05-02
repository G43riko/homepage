import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { forkJoin } from "rxjs";
import { NotificationService } from "../../../../shared/services/notification.service";
import { UtilsService } from "../../../../shared/services/utils.service";
import { MovieHttpService } from "../../services/movie-http.service";

export const MY_FORMATS = {
    parse  : {
        dateInput: "YYYY",
    },
    display: {
        dateInput         : "YYYY",
        monthYearLabel    : "YYYY",
        dateA11yLabel     : "YYYY",
        monthYearA11yLabel: "YYYY",
    },
};

@Component({
    selector       : "app-movie-detail-basic-info",
    templateUrl    : "./movie-detail-basic-info.component.html",
    styleUrls      : ["./movie-detail-basic-info.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers      : [
        {
            provide : DateAdapter,
            useClass: MomentDateAdapter,
            deps    : [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class MovieDetailBasicInfoComponent implements OnInit {
    @Input() public movieForm: FormGroup;
    @Output() public readonly onYearChange = new EventEmitter<Date>();
    public genres: string[]                = [];
    public countries: string[]             = [];

    public constructor(private readonly notificationService: NotificationService,
                       private readonly utilsService: UtilsService,
                       private readonly movieHttpService: MovieHttpService
    ) {
    }

    public closeDatePicker(picker: MatDatepicker<any>, $event: any): void {
        this.onYearChange.emit($event);
        picker.close();
    }

    public ngOnInit(): void {
        const countries$ = this.utilsService.fetchCountries();
        const genres$    = this.movieHttpService.getGenres();
        forkJoin([countries$, genres$]).subscribe(([countries, genres]: [string[], string[]]) => {
            this.countries = countries;
            this.genres    = genres;
        }, (error: any) => this.notificationService.openErrorNotification(error));
    }

}
