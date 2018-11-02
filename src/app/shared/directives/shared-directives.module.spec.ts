import { SharedDirectivesModule } from "./shared-directives.module";

describe("SharedDirectivesModule", () => {
    let personsModule: SharedDirectivesModule;

    beforeEach(() => {
        personsModule = new SharedDirectivesModule();
    });

    it("should create an instance", () => {
        expect(personsModule).toBeTruthy();
    });
});
