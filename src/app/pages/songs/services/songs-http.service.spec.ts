import {HttpClientModule} from "@angular/common/http";
import {TestBed} from "@angular/core/testing";
import {SongsHttpService} from "./songs-http.service";

describe("SongsService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
        ],
        providers: [
            SongsHttpService,
        ],
    }));

    it("should be created", () => {
        const service: SongsHttpService = TestBed.get(SongsHttpService);
        expect(service).toBeTruthy();
    });
});
