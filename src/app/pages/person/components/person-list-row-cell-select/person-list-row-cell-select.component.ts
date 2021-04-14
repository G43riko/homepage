import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Person } from "../../../../shared/models/person/person.model";

@Component({
    selector       : "app-person-list-row-cell-select",
    templateUrl    : "./person-list-row-cell-select.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListRowCellSelectComponent {
    @Input() public readonly person: Person;
}
