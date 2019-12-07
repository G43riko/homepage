import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../../tests/testing.module";

import {MakerPreviewListComponent} from "./maker-preview-list.component";

describe("MakerPreviewRowComponent", () => {
    let component: MakerPreviewListComponent;
    let fixture: ComponentFixture<MakerPreviewListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
            ],
            declarations: [
                MakerPreviewListComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MakerPreviewListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
