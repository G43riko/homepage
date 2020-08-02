import { COMMA, ENTER, SPACE } from "@angular/cdk/keycodes";
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatAutocomplete, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector   : "app-auto-chips",
    templateUrl: "./auto-chips.component.html",
    styleUrls  : ["./auto-chips.component.scss"],
    providers  : [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: AutoChipsComponent,
            multi      : true
        }
    ]
})
export class AutoChipsComponent implements ControlValueAccessor {
    @Input() public allItems: string[] = [];
    @Input() public separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
    @Input() public placeholder: string;
    @Input() public disabled = false;
    @Input() public items: string[] = [];
    public selectable = true;
    public removable = true;
    public addOnBlur = true;
    public itemCtrl = new FormControl();
    public filteredItems: Observable<string[]>;

    @ViewChild("itemInput", {static: false}) public itemInput: ElementRef<HTMLInputElement>;
    @ViewChild("auto", {static: false}) public matAutocomplete: MatAutocomplete;

    public constructor() {
        this.filteredItems = this.itemCtrl.valueChanges.pipe(
            map((item: string | null) => item ? this._filter(item) : this.allItems.slice()));
    }

    public onChange(value: any): void {
        // empty;
    }

    public onTouch(value: any): void {
        // empty;
    }

    public writeValue(obj: any): void {
        this.items = Array.isArray(obj) ? obj : [];
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
        isDisabled ? this.itemCtrl.disable() : this.itemCtrl.enable();
    }

    public add(event: MatChipInputEvent): void {
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            if ((value || "").trim()) {
                this.items.push(value.trim());
                this.onChange(this.items);
            }

            if (input) {
                input.value = "";
            }

            this.itemCtrl.setValue(null);
        }
    }

    public remove(item: string): void {
        const index = this.items.indexOf(item);

        if (index >= 0) {
            this.items.splice(index, 1);
        }
        this.onChange(this.items);
    }

    public selected(event: MatAutocompleteSelectedEvent): void {
        this.items.push(event.option.viewValue);
        this.onChange(this.items);
        this.itemInput.nativeElement.value = "";
        this.itemCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allItems.filter((item) => item.toLowerCase().startsWith(filterValue));
    }

}
