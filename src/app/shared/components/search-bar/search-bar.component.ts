import { Component, OnInit } from "@angular/core";

declare let $: any;

@Component({
    selector: "app-search-bar",
    templateUrl: "./search-bar.component.html",
    styleUrls: ["./search-bar.component.css"],
})
export class SearchBarComponent implements OnInit {

    public ngOnInit(): void {
        const content = [
            {
                title: "Horse",
                url: "/gabo",
                description: "An Animal",
            },
            {
                title: "Cow",
                url: "/gabo2",
                description: "Another Animal",
            },
        ];

        $(".ui.search").search({
            source: content,
        });

        $("#searchBarDropdown")
            .dropdown({
                maxSelections: 3,
            });
    }

}
