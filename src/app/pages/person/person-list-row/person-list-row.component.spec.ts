import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FirebaseModule} from "../../../shared/modules/firebase.module";
import {MaterialModule} from "../../../shared/modules/material.module";
import {TestingModule} from "../../../tests/testing.module";
import {MyFilesComponent} from "../../files/my-files/my-files.component";
import {PersonListRowCellSelectComponent} from "../person-list-row-cell-select/person-list-row-cell-select.component";
import {PersonService} from "../person.service";

import {PersonListRowComponent} from "./person-list-row.component";

describe("PersonListRowComponent", () => {
    let component: PersonListRowComponent;
    let fixture: ComponentFixture<PersonListRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
                MaterialModule,
                FirebaseModule,
            ],
            providers: [
                PersonService,
            ],
            declarations: [
                MyFilesComponent,
                PersonListRowCellSelectComponent,
                PersonListRowComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonListRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
