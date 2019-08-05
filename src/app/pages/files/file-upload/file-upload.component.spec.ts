import {CommonModule} from "@angular/common";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {MaterialModule} from "../../../shared/modules/material.module";
import {SharedPipesModule} from "../../../shared/pipes/shared-pipes.module";
import {TestingModule} from "../../../testing-module/testing.module";
import {PersonListRowCellSelectComponent} from "../../person/person-list-row-cell-select/person-list-row-cell-select.component";

import { FileUploadComponent } from "./file-upload.component";

describe("FileUploadComponent", () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
                MaterialModule,
                SharedPipesModule,
                CommonModule,
            ],
            declarations: [
                PersonListRowCellSelectComponent,
                FileUploadComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
