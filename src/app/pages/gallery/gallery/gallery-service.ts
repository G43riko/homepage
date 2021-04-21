import { Injectable, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BehaviorSubject, combineLatest, of, Subject } from "rxjs";
import { first, map, shareReplay, switchMap, takeUntil } from "rxjs/operators";
import { GalleryMockData } from "./gallery-mock-data";

@Injectable()
export class GalleryService implements OnDestroy {
    private readonly killer$              = new Subject();
    private readonly selectedIndexSource$ = new BehaviorSubject<number>(-1);
    private readonly filterSource$ = new BehaviorSubject<string[]>([]);
    private readonly allImages$ = of(GalleryMockData.images);
    public readonly images$               = this.allImages$.pipe(
        switchMap((images) => {
            return this.filterSource$.pipe(
                map((tags) => {
                    if (!tags?.length) {
                        return images;
                    }

                    return images.filter((image) => {
                        return image.tags.some((tag) => tags.includes(tag));
                    });
                })
            );
        }),
        shareReplay(1),
    );
    public readonly urls$                 = this.images$.pipe(map((images) => images.map((image) => image.url)));

    public readonly tags$ = this.allImages$.pipe(
        map((images) => {
            const result = new Set();
            images.forEach((image) => image.tags.forEach((tag) => result.add(tag)));

            return Array.from(result);
        }),
        shareReplay(1),
    );

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

    public setFilter(tags: string[]): void {
        this.filterSource$.next(tags);
    }
}
