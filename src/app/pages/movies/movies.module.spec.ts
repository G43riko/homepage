import {MoviesModule} from "./movies.module";

describe("MovieModule", () => {
    let personsModule: MoviesModule;

    beforeEach(() => {
        personsModule = new MoviesModule();
    });

    it("should create an instance", () => {
        expect(personsModule).toBeTruthy();
    });
});
