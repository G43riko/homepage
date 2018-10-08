import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "../../../app-routing.module";
import { MapsService } from "../../../shared/services/maps.service";
import { PersonService } from "../../../shared/services/person.service";
import { AboutComponent } from "../../about/about.component";
import { HomeComponent } from "../../home/home.component";
import { PersonModule } from "../person.module";
import { PersonDetailComponent } from "./person-detail.component";

describe("PersonDetailComponent", () => {
    let component: PersonDetailComponent;
    let fixture: ComponentFixture<PersonDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                AboutComponent,
            ],
            imports: [
                AppRoutingModule,
                FormsModule,
                HttpClientJsonpModule,
                PersonModule,
                HttpClientModule,
            ],
            providers: [
                MapsService,
                PersonService,
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
