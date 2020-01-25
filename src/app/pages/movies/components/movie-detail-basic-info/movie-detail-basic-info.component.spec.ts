import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FormControl, FormGroup} from "@angular/forms";
import {of} from "rxjs";
import {AutoChipsComponent} from "../../../../shared/components/auto-chips/auto-chips.component";
import {TestingModule} from "../../../../tests/testing.module";
import {Maker} from "../../models/maker.model";
import {MovieHttpService} from "../../services/movie-http.service";

import {MovieDetailBasicInfoComponent} from "./movie-detail-basic-info.component";

describe("MovieDetailBasicInfoComponent", () => {
    let component: MovieDetailBasicInfoComponent;
    let fixture: ComponentFixture<MovieDetailBasicInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MovieDetailBasicInfoComponent,
                AutoChipsComponent
            ],
            imports: [
                TestingModule
            ],
            providers: [
                {
                    provide: MovieHttpService,
                    useValue: {
                        getCountries: () => of([]),
                        getGenres: () => of([]),
                        getMakerDetail: () => of(new Maker())
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MovieDetailBasicInfoComponent);
        component = fixture.componentInstance;
        component.movieForm = new FormGroup({
            title: new FormControl(""),
            titleSk: new FormControl(""),
            avatar: new FormControl(""),
            duration: new FormControl(0),
            year: new FormControl(1995),
            genres: new FormControl([]),
            countries: new FormControl([])
        });
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
