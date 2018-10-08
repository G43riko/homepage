import { Component, OnInit } from "@angular/core";

declare let $: any;

@Component({
    selector: "app-top-menu",
    templateUrl: "./top-menu.component.html",
    styleUrls: ["./top-menu.component.css"],
})
export class TopMenuComponent implements OnInit {

    public ngOnInit(): void {

        $(".ui.pointing.dropdown").dropdown({
            maxSelections: 3,
        });
        /*
        $('#GPopup')
          .popup()
        ;
        */
        $("#GPopup").popup({
            inline: true,
            // hoverable  : true,
            on: "click",
            position: "bottom right",
        });
    }

    // noinspection JSMethodCanBeStatic
    public toggleSidebar(): void {
        $("#sidebar").sidebar("toggle");
    }

    // noinspection JSMethodCanBeStatic
    public toggleSearchbar(): void {
        $("#searchBar").sidebar("setting", "transition", "overlay").sidebar("toggle");
    }

}
