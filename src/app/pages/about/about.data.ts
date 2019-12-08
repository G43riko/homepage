import {AboutTechnologies} from "./about-technologies.data";

type InfoFlags = "mail" | "phone";
type Teams = "fiit" | "home" | "qbsw" | "softec" | "ibl";
type Technologies = string | "NodeJS" | "Angular" | "Typescript" | "Java";

export interface Info {
    key: string;
    value: string;
    visible: boolean;
    flag?: InfoFlags;
}

interface Work {
    name: string;
    from: number;
    to?: number;
    homepage?: string;
}

interface School {
    name: string;
    from: number;
    fieldOfStudy?: string;
    to?: number;
    homepage?: string;
}

export interface Project {
    name: string;
    team: Teams;
    technologies: Technologies[];
    web?: string;
    documentation?: string;
    sources?: string;
}

interface Technology {
    name: string;
    skill: number;
    type?: string;
    homepage?: string;
}

interface Account {
    label: string;
    icon: string;
    link: string;
}

export class AboutData {
    public static readonly projects: Project[] = [
        {
            team: "fiit",
            name: "Online interaktívna plocha",
            technologies: ["NodeJS", "Grunt", "SocketIO", "Redis"],
        },
        {
            team: "fiit",
            name: "Kognitívne testovanie používatelov",
            technologies: ["NodeJS", "Grunt", "MongoDB", "Python"],
        },
        {
            team: "home",
            name: "@g43/table",
            technologies: ["Angular"],
        },
        {
            team: "home",
            name: "@g43/common",
            technologies: ["Angular"],
        },
        {
            team: "home",
            name: "@g43/menu",
            technologies: ["Angular"],
        },
        {
            team: "home",
            name: "gtools",
            technologies: ["Typescript"],
        },
    ];

    public static readonly accounts: Account[] = [
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
            label: "Codepen",
            icon: "codepen",
            link: "https://codepen.io/g43riko",
        },
        {
            label: "Gitlab",
            icon: "gitlab",
            link: "https://gitlab.com/G43riko",
        },
        {
            label: "NPM",
            icon: "npm",
            link: "https://www.npmjs.com/~g43riko",
        },
        {
            label: "HackerRank",
            icon: "hackerrank",
            link: "https://www.hackerrank.com/gcsollei",
        },
        {
            label: "CSFD",
            icon: "csfd",
            link: "https://www.csfd.cz/uzivatel/163189",
        },
    ];

    public static readonly schools: School[] = [
        {
            name: "FIIT",
            from: 2017,
            to: 2019,
            fieldOfStudy: " Inteligenté softvérové systémy",
            homepage: "https://www.fiit.stuba.sk/",
        },
        {
            name: "FIIT",
            from: 2013,
            to: 2017,
            fieldOfStudy: "Informatics",
            homepage: "https://www.fiit.stuba.sk/",
        },
        {
            name: "Športové gymnázium Ostredková 10",
            from: 2014,
            to: 2012,
            homepage: "https://www.sportschool.sk/",
        },

    ];

    public static readonly languages = [
        {
            name: "Javascript",
            skill: 90,
        },
        {
            name: "Typescript",
            skill: 95,
        },
        {
            name: "Java",
            skill: 80,
        },
        {
            name: "PHP",
            skill: 30,
        },
        {
            name: "Python",
            skill: 40,
        },
        {
            name: "HTML",
            skill: 100,
        },
        {
            name: "CSS",
            skill: 95,
        },
        {
            name: "C",
            skill: 90,
        },
        {
            name: "C++",
            skill: 80,
        },
        {
            name: "PL/SQL",
            skill: 70,
        },
        {
            name: "Assembler",
            skill: 15,
        },
        {
            name: "SQL",
            skill: 85,
        },
    ];

    public static readonly works: Work[] = [
        {
            name: "IBL",
            from: 2020,
            homepage: "https://www.iblsoft.com/",
        },
        {
            name: "QBSW",
            from: 2017,
            to: 2020,
            homepage: "https://qbsw.com/sk/",
        },
        {
            name: "SOFTEC",
            from: 2015,
            to: 2017,
            homepage: "https://www.softec.sk/",
        },
        {
            name: "McDonald",
            from: 2012,
            to: 2012,
            homepage: "https://www.mcdonalds.sk/",
        },
    ];

    public static readonly technologies: Technology[] = Object.values(AboutTechnologies);

    public static readonly infos: Info[] = [
        {
            key: "Name",
            value: "Gabriel Csollei",
            visible: true,
        },
        {
            key: "Email",
            value: "gcsollei@hotmail.com",
            flag: "mail",
            visible: true,
        },
        {
            key: "Phone",
            value: "0905 123 456",
            flag: "phone",
            visible: true,
        },
        {
            key: "Birthday",
            value: "12.11.1993",
            visible: true,
        },
        {
            key: "City",
            value: "Bratislava",
            visible: true,
        },
    ];
}
