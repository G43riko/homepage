import {TestBed} from "@angular/core/testing";

import {ExternalMovieService} from "./external-movie.service";

describe("ExternalMovieService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: ExternalMovieService = TestBed.get(ExternalMovieService);
        expect(service).toBeTruthy();
    });
});
