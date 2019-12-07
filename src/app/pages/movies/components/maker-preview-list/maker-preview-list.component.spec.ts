import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../../tests/testing.module";
import {MovieService} from "../../services/movie.service";

import {MakerPreviewListComponent} from "./maker-preview-list.component";

describe("MakerPreviewRowComponent", () => {
    let component: MakerPreviewListComponent;
    let fixture: ComponentFixture<MakerPreviewListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
            ],
            providers: [
                MovieService,
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
