import {TestBed} from "@angular/core/testing";

import {TestingModule} from "../../tests/testing.module";
import {FirebaseModule} from "../modules/firebase.module";
import {AuthService} from "./auth.service";

describe("AuthService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            TestingModule,
            FirebaseModule
        ]
    }));

    it("should be created", () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
