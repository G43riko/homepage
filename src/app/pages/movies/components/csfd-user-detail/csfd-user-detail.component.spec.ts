import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {CsfdUserDetailComponent} from "./csfd-user-detail.component";

describe("CsfdUserDetailComponent", () => {
    let component: CsfdUserDetailComponent;
    let fixture: ComponentFixture<CsfdUserDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CsfdUserDetailComponent]
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CsfdUserDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
