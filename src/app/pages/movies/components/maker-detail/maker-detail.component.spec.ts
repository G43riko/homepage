import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MakerDetailComponent } from "./maker-detail.component";
import { MoviesModule } from "../../movies.module";
import { SharedModule } from "../../../../shared/shared.module";

describe("MakerDetailComponent", () => {
    let component: MakerDetailComponent;
    let fixture: ComponentFixture<MakerDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MoviesModule,
                SharedModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(MakerDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
