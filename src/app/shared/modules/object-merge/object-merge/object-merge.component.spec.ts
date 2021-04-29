import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectMergeComponent } from './object-merge.component';

describe('ObjectMergeComponent', () => {
  let component: ObjectMergeComponent;
  let fixture: ComponentFixture<ObjectMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectMergeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
