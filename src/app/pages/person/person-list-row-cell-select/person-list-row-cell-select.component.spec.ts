import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonListRowCellSelectComponent } from './person-list-row-cell-select.component';

describe('PersonListRowCellSelectComponent', () => {
  let component: PersonListRowCellSelectComponent;
  let fixture: ComponentFixture<PersonListRowCellSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonListRowCellSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListRowCellSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
