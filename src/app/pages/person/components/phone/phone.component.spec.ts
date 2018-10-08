import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { PhoneComponent } from "./phone.component";

describe("PhoneComponent", () => {
    let component: PhoneComponent;
    let fixture: ComponentFixture<PhoneComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PhoneComponent,
            ],
            imports: [
                FormsModule,
            ],
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(PhoneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
