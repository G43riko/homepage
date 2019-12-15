import { AbstractFixture } from "gtools/out/tests/abstract.fixture";
import { Restaurant } from "../models/restaurant.model";

export class RestaurantFixture extends AbstractFixture<Restaurant> {
    public constructor() {
        super([
            {
                id                : 3,
                zomatoId          : "16508164",
                name              : "Astra",
                key               : "astra",
                visible           : true,
                homepage          : "http://www.astrapub.sk/",
                googleMapsId      : "ChIJax7o5C6JbEcRcD2shzoUn_8",
                restauracieSmeLink: "/astra_153-ruzinov_2980/denne-menu",
                address           : {
                    latitude : 48.1488502,
                    longitude: 17.1445794
                }
            },
            {
                id                : 4,
                zomatoId          : "16508094",
                name              : "Delfín",
                key               : "delphine",
                googleMapsId      : "ChIJMfW7ai6JbEcRP3iW_eXDfgo",
                homepage          : "http://restauraciadelfin.sk",
                restauracieSmeLink: "/delfin_717-ruzinov_2980/denne-menu",
                visible           : true,
                address           : {
                    latitude : 48.1498305556,
                    longitude: 17.1426194444
                }
            },
            {
                id     : 1,
                name   : "Presto",
                visible: true,
            },
            {
                id     : 2,
                name   : "Journal",
                visible: true,
            },
        ]);

    }

}
