import { SearchRestaurantPipe } from "./search-restaurant.pipe";

describe("SearchRestaurantPipe", () => {
    it("create an instance", () => {
        const pipe = new SearchRestaurantPipe();
        expect(pipe).toBeTruthy();
    });
});
