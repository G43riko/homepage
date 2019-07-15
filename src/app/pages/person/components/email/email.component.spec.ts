import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../shared/shared.module";

import { EmailComponent } from "./email.component";
import { TestingModule } from "../../../../testing-module/testing.module";
import { MaterialModule } from "../../../../shared/modules/material.module";
import { FirebaseModule } from "../../../../shared/modules/firebase.module";
import { CoreModule } from "../../../../shared/core.module";

describe("EmailComponent", () => {
    let component: EmailComponent;
    let fixture: ComponentFixture<EmailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
                MaterialModule,
                FirebaseModule,
                CoreModule,
                SharedModule,
            ],
            declarations: [
                EmailComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(EmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
