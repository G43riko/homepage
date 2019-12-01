import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../../tests/testing.module";
import {Movie} from "../../models/movie.model";

import {MoviePosterPreviewComponent} from "./movie-poster-preview.component";

describe("MoviePosterPreviewComponent", () => {
    let component: MoviePosterPreviewComponent;
    let fixture: ComponentFixture<MoviePosterPreviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MoviePosterPreviewComponent,
            ],
            imports: [
                TestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MoviePosterPreviewComponent);
        component = fixture.componentInstance;
        component.movie = new Movie();
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
