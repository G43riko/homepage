import {ChangeDetectionStrategy, Component} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {MovieHttpService} from "../../services/movie-http.service";
import {MovieGuiService} from "../../services/movie-gui.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {first} from "rxjs/operators";

@Component({
    selector: "movie-filter",
    templateUrl: "./movie-filter.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFilterComponent {
    public readonly genres$ = this.movieHttpService.genres$;
    public readonly filterForm = this.formBuilder.group({
        splitYear: false,
        splitDuration: false,
        year: "",
        minYear: "",
        maxYear: "",
        duration: "",
        minDuration: "",
        maxDuration: "",
        csfdId: null,
        imdbId: null,
        movieDbId: null,
    });

    public constructor(
        private readonly movieHttpService: MovieHttpService,
        private readonly movieGuiService: MovieGuiService,
        private readonly formBuilder: FormBuilder,
    ) {
        this.movieGuiService.filter$.pipe(
            first()
        ).subscribe((value) => this.filterForm.patchValue(value));
    }

    public onResetClick(): void {
        this.movieGuiService.clearFilter();
        this.movieGuiService.filter$.pipe(
            first()
        ).subscribe((value) => this.filterForm.patchValue(value));
    }

    public onApplyClick(): void {
        this.movieGuiService.patchFilter(this.filterForm.value);
    }

    public onClickCheckbox(checkbox: MatCheckbox, key: string): void {
        if (this.filterForm.get(key)?.value === false) {
            this.filterForm.get(key)?.setValue(null);
            checkbox.checked = false;
            checkbox.indeterminate = true;
        } else if (this.filterForm.get(key)?.value === null) {
            this.filterForm.get(key)?.setValue(true);
            checkbox.checked = true;
            checkbox.indeterminate = false;
        } else if (this.filterForm.get(key)?.value === true) {
            this.filterForm.get(key)?.setValue(false);
            checkbox.checked = false;
            checkbox.indeterminate = false;
        }
    }
}
