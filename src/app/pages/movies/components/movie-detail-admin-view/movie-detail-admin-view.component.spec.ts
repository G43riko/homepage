import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {MovieDetailAdminViewComponent} from "./movie-detail-admin-view.component";

describe("MovieDetailAdminViewComponent", () => {
    let component: MovieDetailAdminViewComponent;
    let fixture: ComponentFixture<MovieDetailAdminViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MovieDetailAdminViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MovieDetailAdminViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
