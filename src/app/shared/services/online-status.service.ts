import { Injectable } from "@angular/core";
import { fromEvent, merge } from "rxjs";
import { distinctUntilChanged, mapTo, shareReplay, startWith } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class OnlineStatusService {
    public readonly online$ = merge(
        fromEvent(window, "online").pipe(mapTo(true)),
        fromEvent(window, "offline").pipe(mapTo(false)),
    ).pipe(
        startWith(this.isOnline()),
        distinctUntilChanged(),
        shareReplay(1),
    );

    public constructor() {
        this.online$.subscribe();
    }

    public isOnline(): boolean {
        return navigator.onLine;
    }
}
