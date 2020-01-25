import { AbstractFixture } from "gtools/out/tests/abstract.fixture";
import { DailyMenu } from "../models/daily-menu.model";

export class DailyMenuFixture extends AbstractFixture<DailyMenu> {
    public constructor() {
        super([
            {
                id        : "presto" as any,
                restaurant: "presto",
                dishes    : [
                    {
                        name  : "Francúzke ziamiaky",
                        price : 3.45,
                        weight: "120g"
                    },
                    {
                        name  : "Grilovaný oštiepok",
                        price : 3.45,
                        weight: "120g"
                    },
                    {
                        name  : "Hovädzí hamburger",
                        price : 3.45,
                        weight: "120g",
                        type  : "burger"
                    }
                ]
            },
            {
                id        : "delphine" as any,
                restaurant: "Delfín",
                dishes    : [
                    {
                        name  : "Bravčový rezeň",
                        price : 3.45,
                        weight: "120g",
                        type  : "steak"
                    },
                    {
                        name  : "Hovedzý steak",
                        price : 3.45,
                        weight: "120g"
                    },
                    {
                        name  : "Pečený sumček",
                        price : 5.45,
                        weight: "120g",
                        type  : "fish"
                    }
                ]
            },
            {
                id        : "astra" as any,
                restaurant: "astra",
                dishes    : [
                    {
                        type: "special",
                        name: "Hlavné menu"
                    },
                    {
                        type  : "soup",
                        name  : "Slepačí vývar",
                        weight: "120ml"
                    }
                ]
            },
            {
                id        : "lanogi" as any,
                restaurant: "Lanogi",
                dishes    : []
            },
            {
                id        : "journal" as any,
                restaurant: "journal",
                dishes    : [
                    {
                        type  : "soup",
                        name  : "Slepačí vývar",
                        weight: "120ml",
                        price : 0.4
                    },
                    {
                        name  : "Sviečková na smotane",
                        weight: "240g",
                        price : 2
                    }
                ]
            }
        ]);

    }

}
