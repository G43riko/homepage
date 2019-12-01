import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MaterialModule} from "../../../../shared/modules/material.module";

import {PersonListRowCellSelectComponent} from "./person-list-row-cell-select.component";

describe("PersonListRowCellSelectComponent", () => {
    let component: PersonListRowCellSelectComponent;
    let fixture: ComponentFixture<PersonListRowCellSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            MaterialModule,
        ],
      declarations: [
          PersonListRowCellSelectComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListRowCellSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
