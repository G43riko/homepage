import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from "@angular/core";
import { Manager as HammerManager, Swipe } from "hammerjs";

const hammerValue: { Manager: HammerManagerConstructor, Tap: any, Swipe: any } = (window as any).Hammer;

@Directive({
    selector: "[swapDirective]"
})
// tslint:disable-next-line:max-classes-per-file
export class SwapDirective implements OnInit, OnDestroy {
    public constructor(private elementRef: ElementRef, private zone: NgZone) {
    }

    private manager?: HammerManager;


    @Output() public swipeRight = new EventEmitter<void>();
    @Output() public swipeLeft = new EventEmitter<void>();


    public ngOnInit(): void {
        if (hammerValue) {
            this.manager = this.bindHammer();
        }
    }

    public ngOnDestroy(): void {
        if (this.manager) {
            this.manager.destroy();
        }
    }

    protected bindHammer(): HammerManager {
        return this.zone.run((_) => {
            const hostElement = this.elementRef.nativeElement;
            const manager     = new hammerValue.Manager(hostElement);
            manager.add(new Swipe());

            manager.on("swipe", (ev: HammerInput) => {
                if (ev.direction === Hammer.DIRECTION_RIGHT) {
                    return this.swipeRight.emit();
                }
                if (ev.direction === Hammer.DIRECTION_LEFT) {
                    return this.swipeLeft.emit();
                }
            });

            return manager;
        });
    }
}
