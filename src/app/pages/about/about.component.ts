import { Component, OnInit } from "@angular/core";

declare let $: any;

export interface Info {
    key: string;
    value: string;
    flag?: "mail" | "phone";
}

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {
    public readonly telNumber = "0905123456";
    public readonly email = "gcsollei@hotmail.com";
    public readonly infos: Info[] = [{
        key: "Name",
        value: "Gabriel Csollei",
    }, {
        key: "Email",
        value: "gcsollei@hotmail.com",
        flag: "mail",
    }, {
        key: "Phone",
        value: "0905 123 456",
        flag: "phone",
    }, {
        key: "Birthday",
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
        {
            name: "PHP",
            skill: 20,
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
