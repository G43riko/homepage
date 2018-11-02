import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { SongsService } from "./songs.service";

describe("SongsService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
        ],
    }));

    it("should be created", () => {
        const service: SongsService = TestBed.get(SongsService);
        expect(service).toBeTruthy();
    });
});
