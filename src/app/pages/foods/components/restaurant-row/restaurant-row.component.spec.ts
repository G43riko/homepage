import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {RestaurantRowComponent} from "./restaurant-row.component";

describe("RestaurantRowComponent", () => {
    let component: RestaurantRowComponent;
    let fixture: ComponentFixture<RestaurantRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RestaurantRowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RestaurantRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
