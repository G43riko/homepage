import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MakerDetailComponent } from "./maker-detail.component";

describe("MakerDetailComponent", () => {
    let component: MakerDetailComponent;
    let fixture: ComponentFixture<MakerDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MakerDetailComponent],
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(MakerDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
