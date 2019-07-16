import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: "[appDropZone]",
})
export class DropZoneDirective {
    @Output() public dropped = new EventEmitter<FileList>();
    @Output() public hovered = new EventEmitter<boolean>();

    public constructor() {
    }

    @HostListener("drop", ["$event"])
    public onDrop($event: DragEvent): void {
        $event.preventDefault();
        if ($event.dataTransfer) {
            this.dropped.emit($event.dataTransfer.files);
        }
        this.hovered.emit(false);
    }

    @HostListener("dragover", ["$event"])
    public onDragOver($event: DragEvent): void {
        $event.preventDefault();
        this.hovered.emit(true);
    }
}
