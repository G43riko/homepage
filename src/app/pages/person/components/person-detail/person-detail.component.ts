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
import {UtilsService} from "../../../../shared/services/utils.service";
import {PersonService} from "../../person.service";

@Component({
    selector: "app-person-detail",
    templateUrl: "./person-detail.component.html",
    styleUrls: ["./person-detail.component.scss"],
})
export class PersonDetailComponent extends AbstractDetailComponent implements OnInit {
    public selectedPerson: Person;
    public personForm: FormGroup;
    public timer: any;
    public loading = false;
    public readonly countries: string[] = [];
    public filteredCountries: Observable<string[]>;

    public constructor(private readonly route: ActivatedRoute,
                       private readonly mapService: MapsService,
                       private readonly router: Router,
                       private readonly dialog: MatDialog,
                       private readonly utilService: UtilsService,
                       private readonly formBuilder: FormBuilder,
                       private readonly personService: PersonService) {
        super();
    }

    public ngOnInit(): void {
        this.personForm = this.createForm();
        this.utilService.getCountries().subscribe((countries) => {
            this.countries.push(...countries);
            const formAddress = this.personForm.controls.address as FormGroup;
            this.filteredCountries = formAddress.controls.country.valueChanges.pipe(
                startWith(""),
                map((value) => this._filter(value)),
            );
        });

        this.loading = true;

        this.route.params.subscribe((data) => {
            const actId = data["id"];
            this.isNew = actId === "new";
            if (this.isNew) {
                this.processChangedData(new Person(), {disabled: false});
            } else {
                this.personService.getDetail(actId).subscribe((person) => {
                    this.processChangedData(person);
                });
            }

        });
    }

    public createForm(): FormGroup {
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

    public save(): void {
        const method = this.isNew ? this.personService.add : this.personService.update;
        method.call(this.personService, this.selectedPerson).subscribe((data) => this.processChangedData(data));
    }

    public showMap(): void {
        let address = this.personForm.value.address.city + " ";
        address += this.personForm.value.address.street + " ";
        address += this.personForm.value.address.streetNumber;

        this.dialog.open(MapDialogComponent, {
            width: "95%",
            height: "95%",
            data: this.mapService.getLocationEmbedUrl(encodeURI(address)),
        });
    }

    public edit(): void {
        this.disabled = false;
        this.personForm.enable();
    }

    public back(): void {
        if (this.isNew || this.disabled) {
            this.router.navigate(["persons"]);
        } else {
            this.personService.getDetail(this.selectedPerson.person_id).subscribe((data) => this.processChangedData(data));
        }
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.countries.filter((country) => country.toLowerCase().includes(filterValue));
    }

    private processChangedData(data: Person, options?: { disabled?: boolean }): void {
        this.selectedPerson = data;
        this.loading = false;
        this.personForm.setValue(this.selectedPerson.toModel(), {onlySelf: true});
        this.disabled = options && typeof options.disabled === "boolean" ? options.disabled : true;

        this.disabled ? this.personForm.disable() : this.personForm.enable();
    }

}
