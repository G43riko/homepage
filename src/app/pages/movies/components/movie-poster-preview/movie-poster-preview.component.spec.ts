import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../../tests/testing.module";
import {Movie} from "../../models/movie.model";
import {MovieService} from "../../services/movie.service";
import {ExternalLinksComponent} from "../external-links/external-links.component";

import {MoviePosterPreviewComponent} from "./movie-poster-preview.component";

describe("MoviePosterPreviewComponent", () => {
    let component: MoviePosterPreviewComponent;
    let fixture: ComponentFixture<MoviePosterPreviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MoviePosterPreviewComponent,
                ExternalLinksComponent
            ],
            providers: [
                MovieService
            ],
            imports: [
                TestingModule
            ]
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
