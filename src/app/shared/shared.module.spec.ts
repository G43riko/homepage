import { SharedModule } from "./shared.module";

describe("SharedModule", () => {
    let personsModule: SharedModule;

    beforeEach(() => {
        personsModule = new SharedModule();
    });

    it("should create an instance", () => {
        expect(personsModule).toBeTruthy();
    });
});
