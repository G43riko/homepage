import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {MaterialModule} from "../../../shared/modules/material.module";
import {MyFilesComponent} from "../../files/my-files/my-files.component";
import {PersonListRowCellSelectComponent} from "../person-list-row-cell-select/person-list-row-cell-select.component";

import { PersonListRowComponent } from "./person-list-row.component";
import { TestingModule } from "../../../tests/testing.module";
import { FirebaseModule } from "../../../shared/modules/firebase.module";

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
            declarations: [
                MyFilesComponent,
                PersonListRowCellSelectComponent,
                PersonListRowComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(PersonListRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
