import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { AbstractDetailComponent } from "../../../shared/components/abstract-detail.component";
import { Person } from "../../../shared/models/person/person.model";
import { MapsService } from "../../../shared/services/maps.service";
import { PersonService } from "../../../shared/services/person.service";
import { UtilsService } from "../../../shared/services/utils.service";

declare let $: any;

@Component({
    selector: "app-person-detail",
    templateUrl: "./person-detail.component.html",
    styleUrls: ["./person-detail.component.css"],
})
export class PersonDetailComponent extends AbstractDetailComponent implements OnInit {
    public selectedPerson: Person;
    public personForm: FormGroup;
    public mapUrl = "";
    public timer: any;
    public readonly countries: string[] = [];
    public filteredCountries: Observable<string[]>;

    public constructor(private readonly route: ActivatedRoute,
                       private readonly mapService: MapsService,
                       private readonly router: Router,
                       private readonly utilService: UtilsService,
                       private readonly formBuilder: FormBuilder,
                       private readonly personService: PersonService) {
        super();
    }

    public ngOnInit(): void {
        this.personForm = this.createForm();
        this.utilService.getCountries().subscribe((countries) => {
            this.countries.push(...countries);
            this.filteredCountries = this.personForm.controls.address.controls.country.valueChanges.pipe(
                startWith(""),
                map((value) => this._filter(value)),
            );
        });

        this.route.params.subscribe((data) => {
            const actId = data["id"];
            this.isNew = actId === "new";
            if (this.isNew) {
                this.processChangedData(new Person(), {disabled: false});
                this._bindEvents();
            } else {
                this.personService.getDetail(actId).subscribe((person) => {
                    this.processChangedData(person);
                    this._bindEvents();
                });
            }

        });
    }

    public createForm(): FormGroup {
        return this.formBuilder.group({
            name: ["", {validators: Validators.required}],
            surName: ["", {validators: Validators.required}],
            nick: ["", {validators: Validators.required}],
            birthday: ["", {validators: Validators.required}],
            gender: ["", {validators: Validators.required}],
            address: this.formBuilder.group({
                country: ["", {validators: Validators.required}],
                city: ["", {validators: Validators.required}],
                street: ["", {validators: Validators.required}],
                streetNumber: ["", {validators: Validators.required}],
            }),
        });
    }

    public save(): void {
        const method = this.isNew ? this.personService.add : this.personService.update;

        method(this.selectedPerson).subscribe((data) => this.processChangedData(data));
    }

    public showMap(): void {
        let address = this.personForm.value.address.city + " ";
        address += this.personForm.value.address.street + " ";
        address += this.personForm.value.address.streetNumber;

        this.mapUrl = this.mapService.getLocationEmbedUrl(encodeURI(address));
        $(".modal").modal("show");
    }

    public edit(): void {
        this.disabled = false;
        this.personForm.enable();
        this._bindEvents();
    }

    public back(): void {
        if (this.isNew || this.disabled) {
            this.router.navigate(["persons"]);
        }
        else {
            this.personService.getDetail(this.selectedPerson.person_id).subscribe((data) => this.processChangedData(data));
        }
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.countries.filter((country) => country.toLowerCase().includes(filterValue));
    }

    private processChangedData(data: Person, options?: { disabled?: boolean }): void {
        this.selectedPerson = data;
        this.personForm.setValue(this.selectedPerson.toModel(), {onlySelf: true});
        this.disabled = options && typeof options.disabled === "boolean" ? options.disabled : true;

        this.disabled ? this.personForm.disable() : this.personForm.enable();
    }

    private _bindEvents(): void {
        this.timer = setTimeout(() => {
            $(".ui.radio.checkbox").checkbox();
            $("select.dropdown").dropdown();
        }, 10);
    }
}
