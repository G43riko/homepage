import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../../tests/testing.module";
import {MoviesModule} from "../../movies.module";
import {MakerListComponent} from "./maker-list.component";

describe("MovieMakersComponent", () => {
    let component: MakerListComponent;
    let fixture: ComponentFixture<MakerListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
                MoviesModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MakerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
