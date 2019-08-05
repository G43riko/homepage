import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {TestingModule} from "../../../tests/testing.module";
import {MaterialModule} from "../../modules/material.module";

import { LoginScreenComponent } from "./login-screen.component";

describe("LoginScreenComponent", () => {
    let component: LoginScreenComponent;
    let fixture: ComponentFixture<LoginScreenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TestingModule,
            ],
            declarations: [
                LoginScreenComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
