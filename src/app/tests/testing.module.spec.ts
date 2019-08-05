import { TestingModule } from "./testing.module";

describe("TestingModule", () => {
    let coreModule: TestingModule;

    beforeEach(() => {
        coreModule = new TestingModule();
    });

    it("should create an instance", () => {
        expect(coreModule).toBeTruthy();
    });
});
