import { SongsModule } from "./songs.module";

describe("SongsModule", () => {
    let personsModule: SongsModule;

    beforeEach(() => {
        personsModule = new SongsModule();
    });

    it("should create an instance", () => {
        expect(personsModule).toBeTruthy();
    });
});
