import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {AbstractDetailComponent} from "../../../../shared/components/abstract-detail.component";
import {MapDialogComponent} from "../../../../shared/components/map-dialog/map-dialog.component";
import {Person} from "../../../../shared/models/person/person.model";
import {MapsService} from "../../../../shared/services/maps.service";
import {NotificationService} from "../../../../shared/services/notification.service";
import {UtilsService} from "../../../../shared/services/utils.service";
import {PersonHttpService} from "../../person-http.service";

@Component({
    selector: "app-person-detail",
    templateUrl: "./person-detail.component.html",
    styleUrls: ["./person-detail.component.scss"],
})
export class PersonDetailComponent extends AbstractDetailComponent<Person, PersonHttpService> implements OnInit {
    public timer: any;
    public readonly countries: string[] = [];
    public filteredCountries: Observable<string[]>;

    public constructor(route: ActivatedRoute,
                       private readonly mapService: MapsService,
                       router: Router,
                       private readonly dialog: MatDialog,
                       private readonly utilService: UtilsService,
                       notificationService: NotificationService,
                       formBuilder: FormBuilder,
                       httpService: PersonHttpService) {
        super(formBuilder, route, router, httpService, notificationService, "persons");
    }

    public ngOnInit(): void {
        this.utilService.getCountries().subscribe((countries) => {
            this.countries.push(...countries);
            const formAddress = this.detailForm.controls.address as FormGroup;
            this.filteredCountries = formAddress.controls.country.valueChanges.pipe(
                startWith(""),
                map((value) => this._filter(value)),
            );
        });

        this.initialization();
    }

    public save(): void {
        const method = this.isNew ? this.httpService.add : this.httpService.update;
        method.call(this.httpService, this.selectedDetail).subscribe((data) => this.setDetail(data));
    }

    public showMap(): void {
        let address = this.detailForm.value.address.city + " ";
        address += this.detailForm.value.address.street + " ";
        address += this.detailForm.value.address.streetNumber;

        this.dialog.open(MapDialogComponent, {
            width: "95%",
            height: "95%",
            data: this.mapService.getLocationEmbedUrl(encodeURI(address)),
        });
    }

    public setDetail(detail: Person): void {
        this.selectedDetail = detail;
        this.loading = false;
        // this.detailForm.setValue(Person.toModel(this.selectedDetail), {onlySelf: true});
        this.detailForm.patchValue(this.selectedDetail);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.countries.filter((country) => country.toLowerCase().includes(filterValue));
    }

    protected createForm(): FormGroup {
        return this.formBuilder.group({
            name: ["", {validators: Validators.required}],
            surName: ["", {validators: Validators.required}],
            nick: "",
            birthday: ["", {validators: Validators.pattern(/(\d|\?){2}\.(\d|\?){2}.(\d|\?){4}/)}],
            gender: ["", {validators: Validators.required}],
            address: this.formBuilder.group({
                country: "",
                city: "",
                street: "",
                streetNumber: "",
            }),
        });
    }

}
