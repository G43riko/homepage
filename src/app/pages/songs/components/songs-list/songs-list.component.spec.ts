import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AbstractTableComponent} from "../../../../shared/components/abstract-table/abstract-table.component";
import {TestingModule} from "../../../../tests/testing.module";
import {SongsHttpService} from "../../services/songs-http.service";
import {DurationPipe} from "../duration.pipe";
import {SongsNavBarComponent} from "../nav-bar.component";
import {SongControllerComponent} from "../song-controller/song-controller.component";
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
                SongsHttpService,
            ],
            declarations: [
                SongControllerComponent,
                DurationPipe,
                AbstractTableComponent,
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
