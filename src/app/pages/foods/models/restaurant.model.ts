import { Address } from "../../../shared/models/person/address.model";

export class Restaurant {
    public id: number;

    public visible: boolean;
    public name: string;
    public key?: string;
    public phoneNumber?: string[];
    public subZone?: string;
    public timing?: any;
    public googleMapsId?: string;
    public menuLink?: string;
    public homepage?: string;
    public restauracieSmeLink?: string;
    public address?: Address;

    public zomatoId?: string;
    public zomatoLink?: string;
    public zomatoName?: string;
    public zomatoImg?: string;
    public zomatoVotes?: number;
    public zomatoRating?: number;
    public zomatoPrice?: number;
}
