import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { catchError } from "rxjs/operators";
import { AppConfig } from "../../app.config";
import { AuthService } from "../auth.service";
import { AbstractHttpService } from "./abstract-http.service";
import { NotificationService } from "./notification.service";

declare let $: any;

type AllowedTypes = "restaurant";

export interface PlaceAroundParam {
    readonly latitude: number;
    readonly longitude: number;
    readonly type?: AllowedTypes;
    key: string;
    keyword: string;
    location?: string;
    radius?: number;
}

@Injectable()
export class MapsService extends AbstractHttpService {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    // private allowedTypes: string[] = ["accounting", "airport", "amusement_park", "aquarium", "art_gallery", "atm", "bakery", "bank", "bar", "beauty_salon", "bicycle_store", "book_store", "bowling_alley", "bus_station", "cafe", "campground", "car_dealer", "car_rental", "car_repair", "car_wash", "casino", "cemetery", "church", "city_hall", "clothing_store", "convenience_store", "courthouse", "dentist", "department_store", "doctor", "electrician", "electronics_store", "embassy", "fire_station", "florist", "funeral_home", "furniture_store", "gas_station", "gym", "hair_care", "hardware_store", "hindu_temple", "home_goods_store"];

    public getLocationEmbedUrl(searchQuery: string): string {
        /*
        <iframe
          width="600"
          height="450"
          frameborder="0" style="border:0"
          src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY
            &q=Space+Needle,Seattle+WA" allowfullscreen>
        </iframe>
         */
        let url = AppConfig.GOOGLE_MAPS_API_EMBED_URL + "?";
        url += "key=" + AppConfig.GOOGLE_MAPS_API_EMBED_KEY;
        url += "&q=" + searchQuery;
        return url;
    }

    public getPlacesAround(params: PlaceAroundParam): Observable<any> {
        params.radius = params.radius || 500; // max 50000

        params.location = params.latitude + "," + params.longitude;
        params.key      = params.key || AppConfig.GOOGLE_MAPS_API_KEY;

        return this.http.post<any>("http://g43.clanweb.eu/API/maps.php", params).pipe(
            catchError(this.handleError<any>("getPlacesAround")),
        );
        /*
        return new Promise(callback => {
            $.ajax({
                url: "http://g43.clanweb.eu/API/maps.php",
                type: "POST",
                data: obj,
                dataType: "jsonp",
                cache: false,
                jsonpCallback: "callback",
                success: response => {
                    callback(response.results);
                }
            });
        });
        */
        /*
        $.getJSON(url,function (e) {
          console.log(e);
        });
        */
        /*
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
          }
        };
        xhr.open('GET',url);
        xhr.send();
        */
        // return null;
        /*
        return this.http.get(url)
          .toPromise()
          .then(response => response.json() as any[])
          .catch(this.handleError);
        */

    }

    // noinspection JSMethodCanBeStatic
}
