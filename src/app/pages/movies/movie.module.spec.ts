import { MovieModule } from "./movies.module";

describe("MovieModule", () => {
    let personsModule: MovieModule;

    beforeEach(() => {
        personsModule = new MovieModule();
    });

    it("should create an instance", () => {
        expect(personsModule).toBeTruthy();
    });
});
