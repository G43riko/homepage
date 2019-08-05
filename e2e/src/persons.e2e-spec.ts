import {PersonsPage} from "./persons.po";

describe("workspace-project App", () => {
    let page: PersonsPage;

    beforeEach(() => {
        page = new PersonsPage();
    });

    it("should display welcome message", () => {
        page.navigateTo();
        expect(page.getPersonsSize()).toBeGreaterThan(1);
    });
});
