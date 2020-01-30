import { Pipe, PipeTransform } from "@angular/core";
import { Restaurant } from "../models/restaurant.model";

@Pipe({
    name: "searchRestaurant"
})
export class SearchRestaurantPipe implements PipeTransform {

    public transform(value: {restaurant: Restaurant, distance: number}[], key: string): {restaurant: Restaurant, distance: number}[] {
        if (!key) {
            return value;
        }
        const searchedKey = key.toLowerCase()
            .trim();

        return value.filter((restaurant) => {
            if (restaurant.restaurant.key && restaurant.restaurant.key.toLowerCase()
                .includes(searchedKey)) {
                return true;
            }

            return restaurant.restaurant.name && restaurant.restaurant.name.toLowerCase()
                .includes(searchedKey);

        });
    }

}
