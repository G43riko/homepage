import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../../tests/testing.module";
import {MoviesModule} from "../../movies.module";
import {MakersListComponent} from "./makers-list.component";

describe("MovieMakersComponent", () => {
    let component: MakersListComponent;
    let fixture: ComponentFixture<MakersListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
                MoviesModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MakersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
