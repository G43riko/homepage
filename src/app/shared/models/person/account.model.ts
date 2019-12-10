type AccountType = "" | "FACEBOOK" | "GOOGLEPLUS" | "SKYPE" | "LINKEDIN" | "TWITTER" | "YOUTUBE" | "INSTAGRAM" | "GITHUB";

function getLink(account: AccountType): string {
    switch (account) {
        case "FACEBOOK":
            return "https://www.facebook.com/";
        case "LINKEDIN":
            return "https://www.linkedin.com/in/";
        case "TWITTER":
            return "https://twitter.com/";
        case "INSTAGRAM":
            return "https://www.instagram.com/";
        case "GITHUB":
            return "https://github.com/";
        case "YOUTUBE":
            return "https://www.youtube.com/channel/";
        case "GOOGLEPLUS":
            return "https://plus.google.com/u/0/";
        case "SKYPE":
            return "";
    }
    return "";
}

export class Account {
    public static types: { label: string, value: string, icon: string }[] = [
        {
            label: "Facebook",
            value: "FACEBOOK",
            icon: "facebook",
        },
        {
            label: "Google+",
            value: "GOOGLEPLUS",
            icon: "google plus",
        },
        {
            label: "Github",
            value: "GITHUB",
            icon: "github",
        },
        {
            label: "Instagram",
            value: "INSTAGRAM",
            icon: "instagram",
        },
        {
            label: "LinkedIn",
            value: "LINKEDIN",
            icon: "linkedin square",
        },
        {
            label: "Skype",
            value: "SKYPE",
            icon: "skype",
        },
        {
            label: "Twitter",
            value: "TWITTER",
            icon: "twitter",
        },
        {
            label: "Youtube",
            value: "YOUTUBE",
            icon: "youtube",
        },
        {
            label: "Bitbucket",
            value: "BITBUCKET",
            icon: "bitbucket",
        },
    ];

    public account_id: number;
    public type: AccountType;
    public active: boolean;
    public userName: string;
    public link: string;

    public constructor(type: AccountType, userName: string, link = "") {
        this.type = type;
        this.link = link;
        this.userName = userName;
    }

    public static getLink(account: Account): string {
        return getLink(account.type) + (account.link || account.userName);
    }

    public static getIcon(account: Account): string {
        // @ts-ignore
        const type: any = Account.types.find((e) => e.value === account.type);
        return type ? type.icon : "";
    }

    public static parse(account: any): Account {
        const result: Account = new Account(account.type, account.userName, account.link);

        result.active     = account.active;
        result.account_id = account.account_id;

        return result;
    }

}
