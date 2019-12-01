import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {MoviePosterPreviewComponent} from "./movie-poster-preview.component";

describe("MoviePosterPreviewComponent", () => {
    let component: MoviePosterPreviewComponent;
    let fixture: ComponentFixture<MoviePosterPreviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MoviePosterPreviewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MoviePosterPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
