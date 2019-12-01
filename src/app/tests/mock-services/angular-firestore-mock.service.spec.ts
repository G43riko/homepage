import {TestBed} from "@angular/core/testing";

import {AngularFirestoreMockService} from "./angular-firestore-mock.service";

describe("AngularFirestoreMockService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: AngularFirestoreMockService = TestBed.get(AngularFirestoreMockService);
        expect(service).toBeTruthy();
    });
});
