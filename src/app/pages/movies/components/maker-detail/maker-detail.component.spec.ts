import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../../tests/testing.module";
import {ExternalMakerDirective} from "../../directives/external-maker.directive";
import {MakerHttpService} from "../../services/maker-http.service";
import {MakerDetailComponent} from "./maker-detail.component";

describe("MakerDetailComponent", () => {
    let component: MakerDetailComponent;
    let fixture: ComponentFixture<MakerDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule
            ],
            providers: [
                MakerHttpService
            ],
            declarations: [
                MakerDetailComponent,
                ExternalMakerDirective
            ]
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
