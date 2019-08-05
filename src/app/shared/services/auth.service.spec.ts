import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { TestingModule } from "../../tests/testing.module";
import { FirebaseModule } from "../modules/firebase.module";

describe("AuthService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            TestingModule,
            FirebaseModule,
        ],
    }));

    it("should be created", () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
