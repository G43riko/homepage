import {HttpClientModule} from "@angular/common/http";
import {TestBed} from "@angular/core/testing";
import {MovieHttpService} from "./movie-http.service";

describe("MoviesService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientModule
        ],
        providers: [
            MovieHttpService
        ]
    }));

    it("should be created", () => {
        const service: MovieHttpService = TestBed.get(MovieHttpService);
        expect(service).toBeTruthy();
    });
});
