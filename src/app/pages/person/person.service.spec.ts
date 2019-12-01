import {HttpClientModule} from "@angular/common/http";
import {TestBed} from "@angular/core/testing";
import {PersonService} from "./person.service";

describe("PersonService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
        ],
        providers: [
            PersonService,
        ],
    }));

    it("should be created", () => {
        const service: PersonService = TestBed.get(PersonService);
        expect(service).toBeTruthy();
    });
});
