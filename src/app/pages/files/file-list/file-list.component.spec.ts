import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {MaterialModule} from "../../../shared/modules/material.module";
import {SharedPipesModule} from "../../../shared/pipes/shared-pipes.module";
import {TestingModule} from "../../../tests/testing.module";
import {FileUploadComponent} from "../file-upload/file-upload.component";
import {MyFilesComponent} from "../my-files/my-files.component";

import { FileListComponent } from "./file-list.component";

describe("FileListComponent", () => {
    let component: FileListComponent;
    let fixture: ComponentFixture<FileListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TestingModule,
                SharedPipesModule,
            ],
            declarations: [
                FileUploadComponent,
                FileListComponent,
                MyFilesComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
