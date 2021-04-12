import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Person } from "../../../../shared/models/person/person.model";

@Component({
    selector: "app-person-list-row-cell-select",
    templateUrl: "./person-list-row-cell-select.component.html",
    styleUrls: ["./person-list-row-cell-select.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListRowCellSelectComponent implements OnInit {
    @Input() public person: Person;

    constructor() {
    }

    public ngOnInit(): void {
    }

}
