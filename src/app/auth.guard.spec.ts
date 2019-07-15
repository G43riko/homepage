import { inject, TestBed } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";
import { TestingModule } from "./testing-module/testing.module";
import { FirebaseModule } from "./shared/modules/firebase.module";

describe("AuthGuard", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestingModule,
                FirebaseModule,
            ],
            providers: [
                AuthGuard,
            ],
        });
    });

    it("should ...", inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy();
    }));
});
