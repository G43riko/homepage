import { LocalTitle } from "../../shared/types/local-title.type";
import { AboutTechnologies } from "./about-technologies.data";

type InfoFlags = "mail" | "phone";
type Teams = "fiit" | "home" | "qbsw" | "softec" | "ibl";
type Technologies = string | "NodeJS" | "Angular" | "Typescript" | "Java";

export interface Info {
    key: LocalTitle;
    value: LocalTitle;
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
    name: LocalTitle;
    fullName?: LocalTitle;
    from: number;
    fieldOfStudy?: LocalTitle;
    to?: number;
    homepage?: string;
}

export interface Project {
    name: LocalTitle;
    team: Teams;
    technologies: Technologies[];
    demo?: string;
    documentation?: string;
    sources?: string;
}

interface Technology {
    name: string;
    skill: number;
    type?: LocalTitle;
    homepage?: string;
}

interface Account {
    label: string;
    externalIcon?: string;
    materialIcon?: string;
    link: string;
}

export class AboutData {
    public static readonly projects: Project[] = [
        {
            team: "home",
            name: "ShareDesk",
            demo: "http://share-desk.herokuapp.com/",
            sources: "https://github.com/G43riko/ShareDesk",
            technologies: ["NodeJS", "Webpack", "Typescript", "SocketIO"]
        },
        {
            team: "fiit",
            name: {
                sk: "Online interaktívna plocha",
                en: "Online interactive desktop"
            },
            sources: "https://github.com/G43riko/online-interactive-desktop",
            documentation: "https://opac.crzp.sk/?fn=detailBiblioForm&sid=82D5162064037F62A39D80F7A2EE&seo=CRZP-detail-kniha",
            technologies: ["NodeJS", "Grunt", "SocketIO", "Redis"]
        },
        {
            team: "fiit",
            name: {
                sk: "Kognitívne testovanie používatelov",
                en: "Cognitive testing of users"
            },
            demo: "http://tests-playground.herokuapp.com",
            sources: "https://github.com/G43riko/DP",
            documentation: "https://opac.crzp.sk/?fn=detailBiblioForm&sid=A6067EBA35451301886CDD0D9AAB&seo=CRZP-detail-kniha",
            technologies: ["NodeJS", "Grunt", "MongoDB", "Python"]
        },
        {
            team: "fiit",
            name: {
                sk: "Importér verejných datasetov",
                en: "Importer of public datasets",
            },
            documentation: "http://labss2.fiit.stuba.sk/TeamProject/2017/team14iss-it/",
            technologies: ["Angular", "Spring", "Postgres", "Elastic Search"]
        },
        {
            team: "home",
            name: "@g43/table",
            sources: "https://github.com/G43riko/GToolsNG",
            documentation: "https://g43riko.github.io/GToolsNG/documentation/project/table/",
            demo: "https://g43riko.github.io/GToolsNG//#/table/overview",
            technologies: ["Angular"]
        },
        {
            team: "home",
            name: "@g43/common",
            sources: "https://github.com/G43riko/GToolsNG",
            documentation: "https://g43riko.github.io/GToolsNG/documentation/project/common/",
            technologies: ["Angular"]
        },
        {
            team: "home",
            name: "@g43/menu",
            sources: "https://github.com/G43riko/GToolsNG",
            documentation: "https://g43riko.github.io/GToolsNG/documentation/project/menu/",
            demo: "https://g43riko.github.io/GToolsNG/#/menu/overview",
            technologies: ["Angular"]
        },
        {
            team: "home",
            name: "GTools",
            sources: "https://github.com/G43riko/GTools",
            documentation: "https://g43riko.github.io/GTools/",
            technologies: ["Typescript"]
        },
        {
            team: "home",
            name: "Express annotator",
            sources: "https://github.com/G43riko/Express-annotator",
            technologies: ["Typescript"]
        }
    ];

    public static readonly accounts: Account[] = [
        {
            label: "Gist",
            materialIcon: "bookmarks",
            link: "https://gist.github.com/G43riko"
        },
        {
            label: "Github",
            externalIcon: "github",
            link: "https://github.com/G43riko"
        },
        {
            label: "Mixcloud",
            externalIcon: "mixcloud",
            link: "https://github.com/G43riko"
        },
        {
            label: "Youtube",
            externalIcon: "youtube",
            link: "https://github.com/G43riko"
        },
        {
            label: "Linkedin",
            externalIcon: "linkedin",
            link: "https://github.com/G43riko"
        },
        {
            label: "Twitter",
            externalIcon: "twitter",
            link: "https://github.com/G43riko"
        },
        {
            label: "Instagram",
            externalIcon: "instagram",
            link: "https://github.com/G43riko"
        },
        {
            label: "Facebook",
            externalIcon: "facebook",
            link: "https://github.com/G43riko"
        },
        {
            label: "Codepen",
            externalIcon: "codepen",
            link: "https://codepen.io/g43riko"
        },
        {
            label: "Gitlab",
            externalIcon: "gitlab",
            link: "https://gitlab.com/G43riko"
        },
        {
            label: "NPM",
            externalIcon: "npm",
            link: "https://www.npmjs.com/~g43riko"
        },
        {
            label: "HackerRank",
            externalIcon: "hackerrank",
            link: "https://www.hackerrank.com/gcsollei"
        },
        {
            label: "CSFD",
            externalIcon: "csfd",
            link: "https://www.csfd.cz/uzivatel/163189"
        }
    ];

    public static readonly schools: School[] = [
        {
            name: "FIIT",
            fullName: {
                sk: "Fakulta informatiky a informačných technológií",
                en: "Faculty of Informatics and Information Technologies",
            },
            from: 2017,
            to: 2019,
            fieldOfStudy: {
                en: "Intelligent software systems",
                sk: "Inteligenté softvérové systémy",
            },
            homepage: "https://www.fiit.stuba.sk/"
        },
        {
            name: "FIIT",
            fullName: {
                sk: "Fakulta informatiky a informačných technológií",
                en: "Faculty of Informatics and Information Technologies",
            },
            from: 2013,
            to: 2017,
            fieldOfStudy: {
                en: "Informatics",
                sk: "Informatika"
            },
            homepage: "https://www.fiit.stuba.sk/"
        },
        {
            name: {
                sk: "Športové gymnázium Ostredková 10",
                en: "Sport Gymnasium Ostredkova 10"
            },
            from: 2014,
            to: 2012,
            homepage: "https://www.sportschool.sk/"
        }

    ];

    public static readonly languages = [
        {
            name: "Javascript",
            skill: 90
        },
        {
            name: "Typescript",
            skill: 95
        },
        {
            name: "Java",
            skill: 80
        },
        {
            name: "PHP",
            skill: 30
        },
        {
            name: "Python",
            skill: 40
        },
        {
            name: "HTML",
            skill: 100
        },
        {
            name: "CSS",
            skill: 95
        },
        {
            name: "C",
            skill: 90
        },
        {
            name: "C++",
            skill: 80
        },
        {
            name: "PL/SQL",
            skill: 70
        },
        {
            name: "Assembler",
            skill: 15
        },
        {
            name: "SQL",
            skill: 85
        }
    ];

    public static readonly works: Work[] = [
        {
            name: "IBL",
            from: 2020,
            homepage: "https://www.iblsoft.com/"
        },
        {
            name: "QBSW",
            from: 2017,
            to: 2020,
            homepage: "https://qbsw.com/sk/"
        },
        {
            name: "SOFTEC",
            from: 2015,
            to: 2017,
            homepage: "https://www.softec.sk/"
        },
        {
            name: "McDonald",
            from: 2012,
            to: 2012,
            homepage: "https://www.mcdonalds.sk/"
        }
    ];

    public static readonly technologies: Technology[] = Object.values(AboutTechnologies);

    public static readonly infos: Info[] = [
        {
            key: {
                en: "Name",
                sk: "Meno"
            },
            value: "Gabriel Csollei",
            visible: true
        },
        {
            key: "Email",
            value: "gcsollei@hotmail.com",
            flag: "mail",
            visible: true
        },
        {
            key: {
                en: "Phone",
                sk: "Telefón"
            },
            value: "0905 123 456",
            flag: "phone",
            visible: true
        },
        {
            key: {
                en: "Birthday",
                sk: "Dátum narodenia"
            },
            value: {
                sk: "12.11.1993",
                en: "1993/11/12"
            },
            visible: true
        },
        {
            key: {
                en: "Country",
                sk: "Krajna"
            },
            value: {
                sk: "Slovensko",
                en: "Slovakia"
            },
            visible: true
        },
        {
            key: {
                sk: "City",
                en: "Mesto"
            },
            value: "Bratislava",
            visible: true
        }
    ];
}
