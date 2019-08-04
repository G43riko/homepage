import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppConfig } from "../../app.config";
import { AuthService } from "../auth.service";
import { AbstractHttpService } from "./abstract-http.service";
import { NotificationService } from "./notification.service";

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

@Injectable({
    providedIn: "root",
})
export class MapsService extends AbstractHttpService {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public getLocationEmbedUrl(searchQuery: string): string {
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
    }
}
