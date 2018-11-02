import { PersonModule } from "./person.module";

describe("PersonModule", () => {
    let personsModule: PersonModule;

    beforeEach(() => {
        personsModule = new PersonModule();
    });

    it("should create an instance", () => {
        expect(personsModule).toBeTruthy();
    });
});
