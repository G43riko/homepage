import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../tests/testing.module";

import {AutoChipsComponent} from "./auto-chips.component";

describe("AutoChipsComponent", () => {
    let component: AutoChipsComponent;
    let fixture: ComponentFixture<AutoChipsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule
            ],
            declarations: [
                AutoChipsComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutoChipsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
