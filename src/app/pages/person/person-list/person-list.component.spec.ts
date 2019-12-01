import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AbstractTableComponent} from "../../../shared/components/abstract-table/abstract-table.component";
import {PaginatorComponent} from "../../../shared/components/paginator/paginator.component";
import {FirebaseModule} from "../../../shared/modules/firebase.module";
import {MaterialModule} from "../../../shared/modules/material.module";
import {TestingModule} from "../../../tests/testing.module";
import {PersonListRowCellSelectComponent} from "../person-list-row-cell-select/person-list-row-cell-select.component";
import {PersonListRowComponent} from "../person-list-row/person-list-row.component";
import {PersonService} from "../person.service";
import {PersonListComponent} from "./person-list.component";

describe("PersonListComponent", () => {
    let component: PersonListComponent;
    let fixture: ComponentFixture<PersonListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PersonListComponent,
                PersonListRowComponent,
                PersonListRowCellSelectComponent,
                PaginatorComponent,
                AbstractTableComponent,
            ],
            providers: [
                PersonService,
            ],
            imports: [
                FirebaseModule,
                TestingModule,
                MaterialModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
