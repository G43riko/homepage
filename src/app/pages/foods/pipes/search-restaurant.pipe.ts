import { Pipe, PipeTransform } from "@angular/core";
import { Restaurant } from "../models/restaurant.model";

@Pipe({
    name: "searchRestaurant"
})
export class SearchRestaurantPipe implements PipeTransform {

    public transform(value: Restaurant[], key: string): Restaurant[] {
        if (!key) {
            return value;
        }
        const searchedKey = key.toLowerCase()
            .trim();

        return value.filter((restaurant) => {
            if (restaurant.key && restaurant.key.toLowerCase()
                .includes(searchedKey)) {
                return true;
            }

            return restaurant.name && restaurant.name.toLowerCase()
                .includes(searchedKey);

        });
    }

}
