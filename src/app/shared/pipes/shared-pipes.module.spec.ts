import { SharedPipesModule } from "./shared-pipes.module";

describe("SharedDirectivesModule", () => {
    let personsModule: SharedPipesModule;

    beforeEach(() => {
        personsModule = new SharedPipesModule();
    });

    it("should create an instance", () => {
        expect(personsModule).toBeTruthy();
    });
});
