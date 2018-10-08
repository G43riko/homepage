import { Component, Input, OnInit } from "@angular/core";
import { Paginator } from "../../utils/Paginator";

@Component({
    selector: "app-paginator",
    templateUrl: "./paginator.component.html",
    styleUrls: ["./paginator.component.scss"],
})

export class PaginatorComponent implements OnInit {
    @Input() public paginator: Paginator;

    public ngOnInit() {
    }

}
