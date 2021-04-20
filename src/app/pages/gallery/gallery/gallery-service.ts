import { Injectable, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BehaviorSubject, combineLatest, of, Subject } from "rxjs";
import { first, map, switchMap, takeUntil } from "rxjs/operators";
import { GalleryMockData } from "./gallery-mock-data";

@Injectable()
export class GalleryService implements OnDestroy {
    private readonly killer$              = new Subject();
    private readonly selectedIndexSource$ = new BehaviorSubject<number>(-1);
    public readonly images$               = of(GalleryMockData.pokemons);
    public readonly urls$                 = this.images$.pipe(map((images) => images.map((image) => image.url)));

    public readonly selectedImage$ = this.images$.pipe(
        switchMap((images) => this.selectedIndexSource$.pipe(
            map((index) => images[index]),
        ))
    );

    public readonly selectedUrl$ = this.urls$.pipe(
        switchMap((urls) => this.selectedIndexSource$.pipe(
            map((index) => urls[index]),
        ))
    );

    public constructor(
        private readonly router: Router,
        private readonly titleService: Title,
    ) {
        const titleBackup = this.titleService.getTitle();
        this.selectedImage$.pipe(
            takeUntil(this.killer$),
        ).subscribe({
            next    : (image) => {
                if (image) {
                    this.titleService.setTitle("Image detail - " + image.name);
                } else {
                    this.titleService.setTitle(titleBackup);
                }
            },
            complete: () => this.titleService.setTitle(titleBackup),
        });
    }

    public openImageAtIndex(index: number): void {
        this.selectedIndexSource$.next(index);
        if (index < 0) {
            this.router.navigate(["/gallery"]);
        } else {
            this.router.navigate(["/gallery/" + index]);
        }
    }

    public closeSelected(): void {
        this.openImageAtIndex(-1);
    }

    public next(): void {
        combineLatest([
            this.selectedIndexSource$,
            this.urls$
        ]).pipe(first()).subscribe(([index, urls]) => {
            if (index + 1 === urls.length) {
                this.openImageAtIndex(0);
            } else {
                this.openImageAtIndex(index + 1);
            }
        });
    }

    public prev(): void {
        combineLatest([
            this.selectedIndexSource$,
            this.urls$
        ]).pipe(first()).subscribe(([index, urls]) => {
            if (index === 0) {
                this.openImageAtIndex(urls.length - 1);
            } else {
                this.openImageAtIndex(index - 1);
            }
        });
    }

    public ngOnDestroy(): void {
        this.killer$.next();
        this.killer$.complete();
    }
}
