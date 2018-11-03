import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NotificationComponent } from "./notification.component";
import { AlertComponent } from "../alert/alert.component";

describe("NotificationComponent", () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NotificationComponent,
                AlertComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
