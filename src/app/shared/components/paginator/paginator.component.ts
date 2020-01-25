import {Component, Input, OnInit} from "@angular/core";
import {AbstractPaginator} from "../../utils/AbstractPaginator";

@Component({
    selector: "app-paginator",
    templateUrl: "./paginator.component.html",
    styleUrls: ["./paginator.component.scss"]
})

export class PaginatorComponent implements OnInit {
    @Input() public paginator: AbstractPaginator;

    public ngOnInit(): void {
    }

}
