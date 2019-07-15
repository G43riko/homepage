import { Component, OnInit } from "@angular/core";

declare let $: any;

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {
    public readonly telNumber = "0905123456";
    public readonly email = "gcsollei@hotmail.com";
    public readonly infos = [{
        key: "name",
        value: "Gabriel Csollei",
    }, {
        key: "email",
        value: "gcsollei@hotmail.com",
    }, {
        key: "birthday",
        value: "12.11.1993",
    }];

    public readonly technologies = [
        {
            name: "Javascript",
            skill: 90,
        },
        {
            name: "Typescript",
            skill: 90,
        },
        {
            name: "Java",
            skill: 80,
        },
    ];

    public items = [
        {
            label: "Github",
            icon: "github",
            link: "https://github.com/G43riko",
        },
        {
            label: "Mixcloud",
            icon: "mixcloud",
            link: "https://github.com/G43riko",
        },
        {
            label: "Youtube",
            icon: "youtube",
            link: "https://github.com/G43riko",
        },
        {
            label: "Linkedin",
            icon: "linkedin",
            link: "https://github.com/G43riko",
        },
        {
            label: "Twitter",
            icon: "twitter",
            link: "https://github.com/G43riko",
        },
        {
            label: "Instagram",
            icon: "instagram",
            link: "https://github.com/G43riko",
        },
        {
            label: "Facebook",
            icon: "facebook",
            link: "https://github.com/G43riko",
        },
        {
            label: "Google",
            icon: "google plus circle",
            link: "https://github.com/G43riko",
        },

    ];

    public ngOnInit(): void {

        $(".ui.dropdown")
            .dropdown({
                maxSelections: 3,
            });
    }

}
