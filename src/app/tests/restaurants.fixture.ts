import {AbstractFixture} from "gtools";
import {Restaurant} from "../pages/foods/models/restaurant.model";

export class RestaurantFixture extends AbstractFixture<Restaurant> {
    public constructor() {
        super([
            {
                zomatoId: "16508164",
                name: "Astra",
                key: "astra",
                visible: true,
                homepage: "http://www.astrapub.sk/",
                googleMapsId: "ChIJax7o5C6JbEcRcD2shzoUn_8",
                restauracieSmeLink: "/astra_153-ruzinov_2980/denne-menu",
                address: {
                    latitude: 48.1488502,
                    longitude: 17.1445794
                }
            },
            {
                zomatoId: "16508094",
                name: "Delfín",
                key: "delphine",
                googleMapsId: "ChIJMfW7ai6JbEcRP3iW_eXDfgo",
                homepage: "http://restauraciadelfin.sk",
                restauracieSmeLink: "/delfin_717-ruzinov_2980/denne-menu",
                visible: true,
                address: {
                    latitude: 48.1498305556,
                    longitude: 17.1426194444
                }
            },
        ]);

    }

}
