import { SharedComponentsModule } from "./shared-components.module";

describe("SharedComponentsModule", () => {
    let personsModule: SharedComponentsModule;

    beforeEach(() => {
        personsModule = new SharedComponentsModule();
    });

    it("should create an instance", () => {
        expect(personsModule).toBeTruthy();
    });
});
