import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AuthService } from "../auth.service";
import { ErrorManagerService } from "./error-manager.service";
import { NotificationService } from "./notification.service";
import { SongsService } from "./songs.service";

describe("SongsService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [
            SongsService,
            AuthService,
            NotificationService,
            ErrorManagerService],
    }));

    it("should be created", () => {
        const service: SongsService = TestBed.get(SongsService);
        expect(service).toBeTruthy();
    });
});
