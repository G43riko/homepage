import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from "@angular/core";

@Directive({
    selector: "[showAble]",
})
export class ShowAbleDirective implements OnDestroy{
    @Output() public readonly show = new EventEmitter<void>();
    private readonly io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this.show.next();
            }
        });
    });

    public constructor(elementRef: ElementRef) {
        this.io.observe(elementRef.nativeElement);
    }

    public ngOnDestroy(): void {
        this.io.disconnect();
    }
}
