import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "../../../app-routing.module";
import { AboutComponent } from "../../about/about.component";
import { PersonModule } from "../person.module";
import { PersonListComponent } from "./person-list.component";

describe("PersonListComponent", () => {
    let component: PersonListComponent;
    let fixture: ComponentFixture<PersonListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AboutComponent,
            ],
            imports: [
                FormsModule,
                AppRoutingModule,
                HttpClientModule,
                PersonModule,
            ],
        })
               .compileComponents();
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
