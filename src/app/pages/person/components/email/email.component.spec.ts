import {DebugElement} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {Email} from "../../../../shared/models/person/email.model";
import {SharedModule} from "../../../../shared/shared.module";

import {CoreModule} from "../../../../shared/core.module";
import {FirebaseModule} from "../../../../shared/modules/firebase.module";
import {MaterialModule} from "../../../../shared/modules/material.module";
import {TestingModule} from "../../../../tests/testing.module";
import {EmailComponent} from "./email.component";

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
                SharedModule
            ],
            declarations: [
                EmailComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmailComponent);
        component = fixture.componentInstance;
        component.emailList = [new Email("test@tester.com"), new Email("admin@admin.com")];
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("should has correct number of chips", () => {
        const bannerDe: DebugElement = fixture.debugElement;
        const elements = bannerDe.queryAll(By.css(".person-email"));
        expect(elements.length).toBe(2);
    });
    it("should has hidden error message before values has changed", () => {
        const bannerDe: DebugElement = fixture.debugElement;
        const elements = bannerDe.query(By.css(".email-error-message"));
        expect(elements).toBeNull();
    });

    it("should has hidden error message after values has changed", () => {
        component.values.setValue("abc@def.ghi");
        fixture.detectChanges();

        const bannerDe: DebugElement = fixture.debugElement;
        const elements = bannerDe.query(By.css(".email-error-message"));
        expect(elements).toBeNull();
    });

    it("should has visible error message after values has changed", () => {
        component.values.setValue("invalid-email");
        fixture.detectChanges();

        const bannerDe: DebugElement = fixture.debugElement;
        const elements = bannerDe.query(By.css(".email-error-message"));
        expect(elements).toBeTruthy();
    });
});
