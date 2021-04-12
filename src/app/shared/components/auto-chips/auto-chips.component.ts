import { COMMA, ENTER, SPACE } from "@angular/cdk/keycodes";
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatAutocomplete, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { map } from "rxjs/operators";

@Component({
    selector       : "app-auto-chips",
    templateUrl    : "./auto-chips.component.html",
    styleUrls      : ["./auto-chips.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers      : [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: AutoChipsComponent,
            multi      : true
        }
    ]
})
export class AutoChipsComponent implements ControlValueAccessor {
    @Input() public readonly allItems: string[] = [];
    @Input() public readonly separatorKeysCodes = [ENTER, COMMA, SPACE];
    @Input() public readonly placeholder: string;
    public readonly items: string[]             = [];
    public readonly addOnBlur                   = true;
    public readonly itemCtrl                    = new FormControl();
    public readonly filteredItems$              = this.itemCtrl.valueChanges.pipe(
        map((item: string | null) => item ? this._filter(item) : this.allItems.slice()));

    @ViewChild("itemInput") public itemInput: ElementRef<HTMLInputElement>;
    @ViewChild("auto") public matAutocomplete: MatAutocomplete;

    public onChange(value: any): void {
        // empty;
    }

    public onTouch(value: any): void {
        // empty;
    }

    public writeValue(obj: any): void {
        this.items.splice(0, this.items.length);
        if (Array.isArray(obj)) {
            this.items.push(...obj);
        }
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.itemCtrl.disable() : this.itemCtrl.enable();
    }

    public add(event: MatChipInputEvent): void {
        if (this.matAutocomplete.isOpen) {
            return;
        }

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

    public onItemSelect(event: MatAutocompleteSelectedEvent): void {
        this.items.push(event.option.viewValue);
        this.onChange(this.items);
        this.itemInput.nativeElement.value = "";
        this.itemCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allItems.filter((item) => item.toLowerCase().startsWith(filterValue));
    }

    public removeByIndex(index: number): void {
        this.items.splice(index, 1);
        this.onChange(this.items);
    }
}
