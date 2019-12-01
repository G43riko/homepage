import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MaterialModule} from "../../modules/material.module";

import {AbstractTableComponent} from "./abstract-table.component";

describe("AbstractTableComponent", () => {
    let component: AbstractTableComponent;
    let fixture: ComponentFixture<AbstractTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
            ],
            declarations: [
                AbstractTableComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AbstractTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
