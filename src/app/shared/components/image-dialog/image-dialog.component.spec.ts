import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MatDialogRef} from "@angular/material/dialog";
import {TestingModule} from "../../../tests/testing.module";

import {ImageDialogComponent} from "./image-dialog.component";

describe("ImageDialogComponent", () => {
    let component: ImageDialogComponent;
    let fixture: ComponentFixture<ImageDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ImageDialogComponent,
            ],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
            ],
            imports: [
                TestingModule,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
