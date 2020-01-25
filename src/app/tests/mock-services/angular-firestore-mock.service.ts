import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AngularFirestoreMockService {

    public constructor() {
    }

    public collection(name: string): { valueChanges: () => Subject<any> } {
        return {
            valueChanges: () => new Subject<any>()
        };
    }
}
