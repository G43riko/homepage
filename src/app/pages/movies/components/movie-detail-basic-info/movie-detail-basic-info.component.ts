import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MatDatepicker} from "@angular/material/datepicker";
import {NotificationService} from "../../../../shared/services/notification.service";
import {UtilsService} from "../../../../shared/services/utils.service";
import {MovieHttpService} from "../../services/movie-http.service";

export const MY_FORMATS = {
    parse: {
        dateInput: "YYYY",
    },
    display: {
        dateInput: "YYYY",
        monthYearLabel: "YYYY",
        dateA11yLabel: "YYYY",
        monthYearA11yLabel: "YYYY",
    },
};

@Component({
    selector: "app-movie-detail-basic-info",
    templateUrl: "./movie-detail-basic-info.component.html",
    styleUrls: ["./movie-detail-basic-info.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class MovieDetailBasicInfoComponent {
    @Input() public readonly movieForm: FormGroup;
    @Output() public readonly onYearChange = new EventEmitter<Date>();

    public readonly genres$ = this.movieHttpService.genres$;
    public readonly countries$ = this.utilsService.countries$;

    public constructor(
        private readonly notificationService: NotificationService,
        private readonly utilsService: UtilsService,
        private readonly movieHttpService: MovieHttpService
    ) {
    }

    public closeDatePicker(picker: MatDatepicker<unknown>, $event: Date): void {
        this.onYearChange.emit($event);
        picker.close();
    }
}
