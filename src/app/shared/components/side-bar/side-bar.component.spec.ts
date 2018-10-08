import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AppRoutingModule } from "../../../app-routing.module";
import { AboutComponent } from "../../../pages/about/about.component";
import { HomeComponent } from "../../../pages/home/home.component";
import { PersonModule } from "../../../pages/person/person.module";
import { SideBarComponent } from "./side-bar.component";

describe("SideBarComponent", () => {
    let component: SideBarComponent;
    let fixture: ComponentFixture<SideBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SideBarComponent,
                HomeComponent,
                AboutComponent,
            ],
            imports: [
                AppRoutingModule,
                PersonModule,
            ],
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(SideBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
