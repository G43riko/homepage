import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {MovieDetailBasicInfoComponent} from "./movie-detail-basic-info.component";

describe("MovieDetailBasicInfoComponent", () => {
    let component: MovieDetailBasicInfoComponent;
    let fixture: ComponentFixture<MovieDetailBasicInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MovieDetailBasicInfoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MovieDetailBasicInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
