import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PersonListRowComponent } from "./person-list-row.component";

describe("PersonListRowComponent", () => {
    let component: PersonListRowComponent;
    let fixture: ComponentFixture<PersonListRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PersonListRowComponent]
        })
               .compileComponents();
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
