import {TestBed} from "@angular/core/testing";

import {DailyMenuHttpService} from "./daily-menu-http.service";

describe("DailyMenuHttpService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: DailyMenuHttpService = TestBed.get(DailyMenuHttpService);
        expect(service).toBeTruthy();
    });
});
