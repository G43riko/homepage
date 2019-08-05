import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PersonListRowCellAccountComponent } from "./person-list-row-cell-account.component";

describe("PersonListRowCellAccountComponent", () => {
  let component: PersonListRowCellAccountComponent;
  let fixture: ComponentFixture<PersonListRowCellAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonListRowCellAccountComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListRowCellAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
