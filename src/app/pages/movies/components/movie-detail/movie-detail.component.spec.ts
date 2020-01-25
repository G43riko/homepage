import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../../tests/testing.module";
import {MoviesModule} from "../../movies.module";
import {MovieDetailComponent} from "./movie-detail.component";

describe("MovieDetailComponent", () => {
    let component: MovieDetailComponent;
    let fixture: ComponentFixture<MovieDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
                MoviesModule
            ]
        }).compileComponents();
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
