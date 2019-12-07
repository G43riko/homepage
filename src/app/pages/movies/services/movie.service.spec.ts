import {TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../tests/testing.module";

import {MovieService} from "./movie.service";

describe("MovieService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            TestingModule,
        ],
        providers: [
            MovieService,
        ],
    }));

    it("should be created", () => {
        const service: MovieService = TestBed.get(MovieService);
        expect(service).toBeTruthy();
    });
});
