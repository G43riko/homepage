import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { catchError } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { IpInfo } from "../models/ip-info.model";
import { AbstractHttpService } from "./abstract-http.service";
import { NotificationService } from "./notification.service";

@Injectable()
export class LocationService extends AbstractHttpService {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public getIp(): Promise<any> {
        return new Promise((callback, errorCallback) => {
            this._getIpFromGeoLocation((data) => callback(data), (error) => {
                this._getIpFromWebPage().subscribe((data) => callback(data), (error2) => errorCallback(error2));
            });
        });
    }

    private _getIpFromWebPage(): Observable<IpInfo> {
        const IP_API_URL = "http://ip-api.com/json";

        return this.http.get<IpInfo>(IP_API_URL).pipe(
            catchError(this.handleError<IpInfo>("_getIpFromWebPage")),
        );

    }

    private _getIpFromGeoLocation(success: (data: Position) => void, errorCallback: (error: string) => void): void {
        // observer.
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                    navigator.geolocation.getCurrentPosition((data: Position) => {
                        success(data);
                    });
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        errorCallback("Zdielanie polohy nieje povolené");
                    }
                });
        } else {
            errorCallback("Geolokácia nieje v prehliadači podporovaná");
        }
    }

}
