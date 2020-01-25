import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {FoodsOverviewComponent} from "./foods-overview.component";

describe("OverviewComponent", () => {
    let component: FoodsOverviewComponent;
    let fixture: ComponentFixture<FoodsOverviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FoodsOverviewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FoodsOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
