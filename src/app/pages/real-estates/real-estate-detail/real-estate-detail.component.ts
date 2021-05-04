import {ChangeDetectionStrategy, Component, Inject, Optional} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {BehaviorSubject} from "rxjs";
import {RealEstate} from "../real-estate";

@Component({
    selector: "app-real-estate-detail",
    templateUrl: "./real-estate-detail.component.html",
    styleUrls: ["./real-estate-detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RealEstateDetailComponent {
    private readonly detailSource$ = new BehaviorSubject<RealEstate | null>(null);
    public readonly detail$ = this.detailSource$.asObservable();

    public constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: { realEstate: RealEstate }) {
        if (data?.realEstate) {
            this.detailSource$.next(data.realEstate);
        }
    }

}
