import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AccountsService } from "./accounts.service";

describe("AccountsService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
        ],
    }));

    it("should be created", () => {
        const service: AccountsService = TestBed.get(AccountsService);
        expect(service).toBeTruthy();
    });
});
