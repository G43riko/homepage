import { Pipe, PipeTransform } from "@angular/core";
import { removeAccentedCharacters } from "gtools/GUtils";
import { DailyMenu } from "../models/daily-menu.model";

const tagStart = "<span class=\"searched\">";
const tagEnd   = "</span>";
const regex    = new RegExp(`(${ tagStart }|${ tagEnd })`, "g");

@Pipe({
    name: "searchFoodPipe"
})
export class SearchFoodPipe implements PipeTransform {
    public transform(value: DailyMenu["dishes"], key: string): DailyMenu["dishes"] | [null] {
        if (!value) {
            return [null];
        }
        value.forEach((item) => item.name && (item.name = item.name.replace(regex, "")));
        if (!key) {
            return value;
        }
        const query = removeAccentedCharacters(key.toLowerCase());

        const result = value.filter((menu) => {
            const index = removeAccentedCharacters(menu.name.toLowerCase())
                .indexOf(query);
            if (index >= 0) {
                menu.nameHTML = menu.name.substr(0, index) +
                    tagStart +
                    menu.name.substr(index, query.length) +
                    tagEnd +
                    menu.name.substr(index + query.length, menu.name.length - (index + query.length));
            }

            return index >= 0;
        });

        return result.length > 0 ? result : [null];
    }
}
