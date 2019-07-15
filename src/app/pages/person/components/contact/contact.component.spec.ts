import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../shared/shared.module";
import { ContactComponent } from "./contact.component";
import { CoreModule } from "../../../../shared/core.module";

describe("ContactComponent", () => {
    let component: ContactComponent;
    let fixture: ComponentFixture<ContactComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports     : [
                CoreModule,
                SharedModule,
            ],
            declarations: [
                ContactComponent,
            ],
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(ContactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
