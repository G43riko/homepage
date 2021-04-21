import { ChangeDetectionStrategy, Component, ElementRef, HostListener } from "@angular/core";
import { delay, first } from "rxjs/operators";
import { GalleryService } from "../gallery/gallery-service";

@Component({
    selector       : "app-gallery-image-detail",
    templateUrl    : "./gallery-image-detail.component.html",
    styleUrls      : ["./gallery-image-detail.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryImageDetailComponent {
    public readonly selectedUrl$ = this.galleryService.selectedUrl$;
    public constructor(
        private readonly elementRef: ElementRef,
        private readonly galleryService: GalleryService,
    ) {
        this.selectedUrl$.pipe(first(), delay(0)).subscribe((id) => {
            if (!id) {
                this.back();
            }
        });
    }

    @HostListener("wheel", ["$event"])
    private onWheel(event: WheelEvent): void {
        if (event.deltaY > 0) {
            this.openNext();
            event.preventDefault();
        } else if (event.deltaY < 0) {
            this.openPrev();
            event.preventDefault();
        }
    }

    @HostListener("window:keydown", ["$event"])
    private onkeydown(event: KeyboardEvent): void {
        if (event.key === "ArrowRight") {
            this.openNext();
        } else if (event.key === "ArrowLeft") {
            this.openPrev();
        } else if (event.key === "Escape") {
            this.back();
        }
    }

    public back(): void {
        this.galleryService.closeSelected();
    }

    public openPrev(): void {
        this.galleryService.prev();
    }

    public openNext(): void {
        this.galleryService.next();
    }

    public onFullscreenClick(): void {
        if(document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen();
        }
    }
}
