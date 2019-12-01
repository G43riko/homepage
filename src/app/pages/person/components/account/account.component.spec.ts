import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CoreModule} from "../../../../shared/core.module";
import {SharedModule} from "../../../../shared/shared.module";
import {AccountComponent} from "./account.component";

describe("AccountComponent", () => {
    let component: AccountComponent;
    let fixture: ComponentFixture<AccountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AccountComponent,
            ],
            imports: [
                CoreModule,
                SharedModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(AccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
