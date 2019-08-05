import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../testing-module/testing.module";
import {MaterialModule} from "../../modules/material.module";
import {SharedPipesModule} from "../../pipes/shared-pipes.module";

import {MapDialogComponent} from "./map-dialog.component";

describe("MapDialogComponent", () => {
    let component: MapDialogComponent;
    let fixture: ComponentFixture<MapDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
                MaterialModule,
                SharedPipesModule,
            ],
            declarations: [
                MapDialogComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
