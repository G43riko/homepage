import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../shared/shared.module";
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
                SharedModule,
            ],
        }).compileComponents();
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
