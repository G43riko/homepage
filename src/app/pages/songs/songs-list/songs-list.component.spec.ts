import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TestingModule } from "../../../testing-module/testing.module";
import { SongsListComponent } from "./songs-list.component";
import { SongsNavBarComponent } from "../components/nav-bar.component";

describe("SongsListComponent", () => {
    let component: SongsListComponent;
    let fixture: ComponentFixture<SongsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports     : [
                TestingModule,
            ],
            declarations: [
                SongsListComponent,
                SongsNavBarComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(SongsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
