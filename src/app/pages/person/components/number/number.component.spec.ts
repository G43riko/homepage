import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../shared/shared.module";

import { NumberComponent } from "./number.component";
import { TestingModule } from "../../../../testing-module/testing.module";
import { MaterialModule } from "../../../../shared/modules/material.module";
import { CoreModule } from "../../../../shared/core.module";

describe("NumberComponent", () => {
    let component: NumberComponent;
    let fixture: ComponentFixture<NumberComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
                MaterialModule,
                CoreModule,
                SharedModule,
            ],
            declarations: [
                NumberComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(NumberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
