import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MovieMakersComponent } from "./movie-makers.component";

describe("MovieMakersComponent", () => {
    let component: MovieMakersComponent;
    let fixture: ComponentFixture<MovieMakersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MovieMakersComponent],
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
