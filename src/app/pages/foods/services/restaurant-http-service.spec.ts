import {TestBed} from "@angular/core/testing";

import {RestaurantHttpService} from "./restaurant-http.service";

describe("RestaurantHttpServiceService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: RestaurantHttpService = TestBed.get(RestaurantHttpService);
        expect(service).toBeTruthy();
    });
});
