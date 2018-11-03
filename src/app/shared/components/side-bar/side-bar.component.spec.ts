import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SideBarComponent } from "./side-bar.component";
import { TestingModule } from "../../../testing-module/testing.module";

describe("SideBarComponent", () => {
    let component: SideBarComponent;
    let fixture: ComponentFixture<SideBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
            ],
            declarations: [
                SideBarComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(SideBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
