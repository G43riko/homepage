import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PersonModule } from "../person.module";
import { PersonListComponent } from "./person-list.component";
import { TestingModule } from "../../../testing-module/testing.module";

describe("PersonListComponent", () => {
    let component: PersonListComponent;
    let fixture: ComponentFixture<PersonListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
            ],
            imports: [
                TestingModule,
                PersonModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(PersonListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
