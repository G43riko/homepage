import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TestingModule } from "../../../testing-module/testing.module";
import { SongsNavBarComponent } from "./nav-bar.component";

describe("SongsNavBarComponent", () => {
    let component: SongsNavBarComponent;
    let fixture: ComponentFixture<SongsNavBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports     : [
                TestingModule,
            ],
            declarations: [
                SongsNavBarComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(SongsNavBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
