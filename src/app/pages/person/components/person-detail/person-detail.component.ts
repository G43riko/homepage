import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { first, map, shareReplay, startWith, switchMap } from "rxjs/operators";
import { AbstractDetailComponent } from "../../../../shared/components/abstract-detail.component";
import { MapDialogComponent } from "../../../../shared/components/map-dialog/map-dialog.component";
import { Person } from "../../../../shared/models/person/person.model";
import { MapsService } from "../../../../shared/services/maps.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { UtilsService } from "../../../../shared/services/utils.service";
import { PersonHttpService } from "../../services/person-http.service";

@Component({
    selector       : "app-person-detail",
    templateUrl    : "./person-detail.component.html",
    styleUrls      : ["./person-detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetailComponent extends AbstractDetailComponent<Person, PersonHttpService> implements OnInit {
    public readonly countries$ = this.utilService.countries$;

    public readonly filteredCountries$ = this.countries$.pipe(
        switchMap((countries) => {
            const countriesFilter$ = this.detailForm.get("address.country")?.valueChanges.pipe(startWith("")) ?? of("");

            return countriesFilter$.pipe(
                map((countriesFilter) => {
                    const filterValue = countriesFilter.toLowerCase();

                    return countries.filter((country) => country.toLowerCase().includes(filterValue));
                })
            );
        }),
        shareReplay(1),
    );

    public constructor(route: ActivatedRoute,
                       router: Router,
                       private readonly mapService: MapsService,
                       private readonly dialog: MatDialog,
                       private readonly utilService: UtilsService,
                       notificationService: NotificationService,
                       formBuilder: FormBuilder,
                       httpService: PersonHttpService) {
        super(formBuilder, route, router, httpService, notificationService, "persons");
    }

    public ngOnInit(): void {
        this.initialization();
    }

    public save(): void {
        this.loadingSource$.next(true);
        this.isNew$.pipe(
            switchMap((isNew) => {
                const method = isNew ? this.httpService.add : this.httpService.update;

                return method.call(this.httpService, this.selectedDetail);
            }),
            first(),
        ).subscribe({
            next    : (data) => this.setDetail(data),
            complete: () => this.loadingSource$.next(false),
        });
    }

    public showMap(): void {
        this.dialog.open(MapDialogComponent, {
            width : "95%",
            height: "95%",
            data  : this.mapService.getLocationEmbedUrlFromAddress(this.detailForm.value.address)
        });
    }

    public setDetail(detail: Person): void {
        this.selectedDetail = detail;
        this.selectedDetailSource$.next(detail);
        this.loadingSource$.next(false);
        this.detailForm.patchValue(this.selectedDetail);
    }

    protected createForm(): FormGroup {
        return this.formBuilder.group({
            name    : ["", {validators: Validators.required}],
            surName : ["", {validators: Validators.required}],
            nick    : "",
            birthday: ["", {validators: Validators.pattern(/(\d|\?){2}\.(\d|\?){2}.(\d|\?){4}/)}],
            gender  : ["", {validators: Validators.required}],
            address : this.formBuilder.group({
                country     : "",
                city        : "",
                street      : "",
                streetNumber: ""
            })
        });
    }

}
