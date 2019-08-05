import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AngularFireAuthMockService {
    public readonly authState = new Subject();

    public constructor() {
        this.authState.next({});
    }
}
