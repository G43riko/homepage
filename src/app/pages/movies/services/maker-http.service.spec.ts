import {TestBed} from "@angular/core/testing";
import {TestingModule} from "../../../tests/testing.module";

import {MakerHttpService} from "./maker-http.service";

describe("MakerHttpService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            TestingModule
        ],
        providers: [
            MakerHttpService
        ]
    }));

    it("should be created", () => {
        const service: MakerHttpService = TestBed.get(MakerHttpService);
        expect(service).toBeTruthy();
    });
});
