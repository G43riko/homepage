import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonQuickCreateComponent } from './person-quick-create.component';

describe('PersonQuickCreateComponent', () => {
  let component: PersonQuickCreateComponent;
  let fixture: ComponentFixture<PersonQuickCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonQuickCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonQuickCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
