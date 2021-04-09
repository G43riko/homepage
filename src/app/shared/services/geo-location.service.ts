import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Address} from "../models/person/address.model";

@Injectable({
    providedIn: "root"
})
export class GeoLocationService {
    public readonly coordinates: BehaviorSubject<Address> = new BehaviorSubject<Address>({});
    private readonly id: number;

    public constructor() {
        if (!navigator.geolocation) {
            this.coordinates.error("Geolocation is not supported by this browser.");

            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            this.coordinates.next({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, (error) => this.coordinates.error(error));
    }

    public cleanUp(): void {
        if (this.id) {
            navigator.geolocation.clearWatch(this.id);
        }
    }

    public distanceAsync(coordinates: Address): Observable<number> {
        if (!coordinates) {
            return of(0);
        }

        return this.coordinates.pipe(map<Address, number>((myCoordinates: Address) => {
            if (!myCoordinates) {
                return 0;
            }

            return this.calcCrow(Number(myCoordinates.latitude), Number(myCoordinates.longitude), Number(coordinates.latitude), Number(coordinates.longitude));
        }));
    }

    public formatDistance(distance: number): string {
        if (distance < 1) {
            return (distance * 1000).toFixed(0) + " m ";
        }

        return distance.toFixed(2) + " km ";
    }

    public distanceFrom(coordinates?: Address | null): number {
        return this.distance(coordinates, this.coordinates.value);
    }

    public distance(coordinates?: Address | null, myCoordinates?: Address | null): number {
        if (!coordinates || !myCoordinates) {
            return 0;
        }

        return this.calcCrow(Number(myCoordinates.latitude), Number(myCoordinates.longitude), Number(coordinates.latitude), Number(coordinates.longitude));
    }

    private calcCrow(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const toRad = (value: number): number => {
            return value * Math.PI / 180;
        };
        const R = 6371; // km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
}
