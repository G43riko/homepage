import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MovieMakersComponent } from "./movie-makers.component";
import { MoviesModule } from "../movies.module";

describe("MovieMakersComponent", () => {
    let component: MovieMakersComponent;
    let fixture: ComponentFixture<MovieMakersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MoviesModule],
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(MovieMakersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
