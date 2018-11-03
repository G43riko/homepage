import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MakerDetailComponent } from "./maker-detail.component";
import { TestingModule } from "../../../../testing-module/testing.module";
import { ExternalMakerDirective } from "../../directives/external-maker.directive";

describe("MakerDetailComponent", () => {
    let component: MakerDetailComponent;
    let fixture: ComponentFixture<MakerDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
            ],
            declarations: [
                MakerDetailComponent,
                ExternalMakerDirective,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(MakerDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
