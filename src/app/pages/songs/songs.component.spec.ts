import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CoreModule} from "../../shared/core.module";
import {SongsComponent} from "./songs.component";
import {SongsModule} from "./songs.module";

describe("SongsComponent", () => {
    let component: SongsComponent;
    let fixture: ComponentFixture<SongsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SongsModule,
                CoreModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(SongsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
