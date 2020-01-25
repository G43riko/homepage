import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {MaterialModule} from "../../../shared/modules/material.module";
import {TestingModule} from "../../../tests/testing.module";

import { AccountListComponent } from "./account-list.component";

describe("AccountListComponent", () => {
    let component: AccountListComponent;
    let fixture: ComponentFixture<AccountListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
                MaterialModule
            ],
            declarations: [
                AccountListComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
