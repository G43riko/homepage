import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MixesListComponent } from "./mixes-list.component";

describe("MixesListComponent", () => {
    let component: MixesListComponent;
    let fixture: ComponentFixture<MixesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MixesListComponent]
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MixesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
