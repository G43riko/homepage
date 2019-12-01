import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../tests/testing.module";
import {SongsNavBarComponent} from "../components/nav-bar.component";
import {SongControllerComponent} from "../components/song-controller/song-controller.component";
import {SongsService} from "../songs.service";
import {SongsListComponent} from "./songs-list.component";

describe("SongsListComponent", () => {
    let component: SongsListComponent;
    let fixture: ComponentFixture<SongsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
            ],
            providers: [
                SongsService,
            ],
            declarations: [
                SongControllerComponent,
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
