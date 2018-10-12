import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MovieDetailComponent } from "./movie-detail.component";
import { MoviesModule } from "../movies.module";
import { SharedModule } from "../../../shared/shared.module";

describe("MovieDetailComponent", () => {
    let component: MovieDetailComponent;
    let fixture: ComponentFixture<MovieDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MoviesModule,
                SharedModule,
            ],
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(MovieDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
