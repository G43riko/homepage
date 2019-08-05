import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {TestingModule} from "../../../testing-module/testing.module";

import { MyFilesComponent } from "./my-files.component";

describe("MyFilesComponent", () => {
    let component: MyFilesComponent;
    let fixture: ComponentFixture<MyFilesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
            ],
            declarations: [
                MyFilesComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyFilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
