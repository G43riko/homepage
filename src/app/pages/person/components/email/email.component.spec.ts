import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { EmailComponent } from "./email.component";
import { PersonModule } from "../../person.module";
import { SharedComponentsModule } from "../../../../shared/components/shared-components.module";

describe("EmailComponent", () => {
    let component: EmailComponent;
    let fixture: ComponentFixture<EmailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({

            imports: [
                SharedComponentsModule,
                PersonModule,
            ],
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(EmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
