import { Directive, HostListener, Input } from "@angular/core";

@Directive({
    selector: "[externalLink]"
})
export class ExternalLinkDirective {
    @Input() public externalLink: string;

    @HostListener("click", ["$event"])
    public onClick($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        window.open(this.externalLink, "_blank");
    }
}
