import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PersonDetailComponent } from "./person-detail.component";
import { MoviesModule } from "../../movies/movies.module";
import { SharedModule } from "../../../shared/shared.module";

describe("PersonDetailComponent", () => {
    let component: PersonDetailComponent;
    let fixture: ComponentFixture<PersonDetailComponent>;

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
        fixture   = TestBed.createComponent(PersonDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
