import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";

declare const $: any;

@Component({
    selector: "app-alert-component",
    templateUrl: "./alert.component.html",
    styleUrls: ["./alert.component.scss"],
})

export class AlertComponent implements OnInit {
    @Input() public title: string;
    @Input() public text: string;
    @Output() public exit: EventEmitter<any> = new EventEmitter();
    @ViewChild("dialog") private readonly el: ElementRef;

    public ngOnInit(): void {
        const instance = this;
        $(this.el.nativeElement).find(".close").on("click", function(this: any): void {
            $(this).closest(".message").transition({
                animation: "fade",
                onComplete: () => {
                    instance.exit.emit();
                },
            });
        });
    }
}
