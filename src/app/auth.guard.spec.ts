import { inject, TestBed } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";
import { FirebaseModule } from "./shared/modules/firebase.module";
import {TestingModule} from "./tests/testing.module";

describe("AuthGuard", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
                FirebaseModule
            ],
            providers: [
                AuthGuard
            ]
        });
    });

    it("should ...", inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy();
    }));
});
