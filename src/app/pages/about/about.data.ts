import { LocalTitle } from "../../shared/types/local-title.type";

// TODO: load this data from external file

type InfoFlags = "mail" | "phone";

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

interface Account {
    label: string;
    externalIcon?: string;
    materialIcon?: string;
    link: string;
}

export class AboutData {
    public static readonly accounts: Account[] = [
        {
            label       : "Gist",
            materialIcon: "bookmarks",
            link        : "https://gist.github.com/G43riko"
        },
        {
            label       : "Github",
            externalIcon: "github",
            link        : "https://github.com/G43riko"
        },
        {
            label       : "Mixcloud",
            externalIcon: "mixcloud",
            link        : "https://github.com/G43riko"
        },
        {
            label       : "Youtube",
            externalIcon: "youtube",
            link        : "https://github.com/G43riko"
        },
        {
            label       : "Linkedin",
            externalIcon: "linkedin",
            link        : "https://github.com/G43riko"
        },
        {
            label       : "Twitter",
            externalIcon: "twitter",
            link        : "https://github.com/G43riko"
        },
        {
            label       : "Instagram",
            externalIcon: "instagram",
            link        : "https://github.com/G43riko"
        },
        {
            label       : "Facebook",
            externalIcon: "facebook",
            link        : "https://github.com/G43riko"
        },
        {
            label       : "Codepen",
            externalIcon: "codepen",
            link        : "https://codepen.io/g43riko"
        },
        {
            label       : "Gitlab",
            externalIcon: "gitlab",
            link        : "https://gitlab.com/G43riko"
        },
        {
            label       : "NPM",
            externalIcon: "npm",
            link        : "https://www.npmjs.com/~g43riko"
        },
        {
            label       : "HackerRank",
            externalIcon: "hackerrank",
            link        : "https://www.hackerrank.com/gcsollei"
        },
        {
            label       : "CSFD",
            externalIcon: "csfd",
            link        : "https://www.csfd.cz/uzivatel/163189"
        }
    ];

    public static readonly schools: School[] = [
        {
            name        : "FIIT",
            fullName    : {
                sk: "Fakulta informatiky a informačných technológií",
                en: "Faculty of Informatics and Information Technologies",
            },
            from        : 2017,
            to          : 2019,
            fieldOfStudy: {
                en: "Intelligent software systems",
                sk: "Inteligenté softvérové systémy",
            },
            homepage    : "https://www.fiit.stuba.sk/"
        },
        {
            name        : "FIIT",
            fullName    : {
                sk: "Fakulta informatiky a informačných technológií",
                en: "Faculty of Informatics and Information Technologies",
            },
            from        : 2013,
            to          : 2017,
            fieldOfStudy: {
                en: "Informatics",
                sk: "Informatika"
            },
            homepage    : "https://www.fiit.stuba.sk/"
        },
        {
            name    : {
                sk: "Športové gymnázium Ostredková 10",
                en: "Sport Gymnasium Ostredkova 10"
            },
            from    : 2014,
            to      : 2012,
            homepage: "https://www.sportschool.sk/"
        }

    ];

    public static readonly languages = [
        {
            name : "Javascript",
            skill: 90
        },
        {
            name : "Typescript",
            skill: 95
        },
        {
            name : "Java",
            skill: 80
        },
        {
            name : "PHP",
            skill: 30
        },
        {
            name : "Python",
            skill: 40
        },
        {
            name : "HTML",
            skill: 100
        },
        {
            name : "CSS",
            skill: 95
        },
        {
            name : "C",
            skill: 90
        },
        {
            name : "C++",
            skill: 80
        },
        {
            name : "PL/SQL",
            skill: 70
        },
        {
            name : "Assembler",
            skill: 15
        },
        {
            name : "SQL",
            skill: 85
        }
    ];

    public static readonly works: Work[] = [
        {
            name    : "IBL",
            from    : 2020,
            homepage: "https://www.iblsoft.com/"
        },
        {
            name    : "QBSW",
            from    : 2017,
            to      : 2020,
            homepage: "https://qbsw.com/sk/"
        },
        {
            name    : "SOFTEC",
            from    : 2015,
            to      : 2017,
            homepage: "https://www.softec.sk/"
        },
        {
            name    : "McDonald",
            from    : 2012,
            to      : 2012,
            homepage: "https://www.mcdonalds.sk/"
        }
    ];


    public static readonly infos: Info[] = [
        {
            key    : {
                en: "Name",
                sk: "Meno"
            },
            value  : "Gabriel Csollei",
            visible: true
        },
        {
            key    : "Email",
            value  : "gcsollei@hotmail.com",
            flag   : "mail",
            visible: true
        },
        {
            key    : {
                en: "Phone",
                sk: "Telefón"
            },
            value  : "0905 123 456",
            flag   : "phone",
            visible: true
        },
        {
            key    : {
                en: "Birthday",
                sk: "Dátum narodenia"
            },
            value  : {
                sk: "12.11.1993",
                en: "1993/11/12"
            },
            visible: true
        },
        {
            key    : {
                en: "Country",
                sk: "Krajna"
            },
            value  : {
                sk: "Slovensko",
                en: "Slovakia"
            },
            visible: true
        },
        {
            key    : {
                sk: "City",
                en: "Mesto"
            },
            value  : "Bratislava",
            visible: true
        }
    ];
}
