import {HttpClientModule} from "@angular/common/http";
import {TestBed} from "@angular/core/testing";
import {PersonHttpService} from "./person-http.service";

describe("PersonService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
        ],
        providers: [
            PersonHttpService,
        ],
    }));

    it("should be created", () => {
        const service: PersonHttpService = TestBed.get(PersonHttpService);
        expect(service).toBeTruthy();
    });
});
