import { Injectable } from "@angular/core";

interface KeywordData {
    match: RegExp;
    color?: string;
    mapFunction?: (...params: any[]) => string;
}

export interface HighlightData {
    keywords: KeywordData[];
}

const createAnyRegex = (data: string[], {prefix = "", suffix = "", flags  ="g"}): RegExp => {
    return new RegExp(`${prefix}(${ data.join("|") })${suffix}`, flags);
};

const highlightData: { [key: string]: KeywordData[] } = {
    docker: [
        {
            match: createAnyRegex(["FROM", "WORKDIR", "COPY", "RUN", "ENV", "USER", "EXPOSE", "CMD"], {prefix: "^", flags: "gmi"}),
            color: "#ff0000",
        },
        {
            match: /\d+\.\d+\.\d+/g,
            color: "#0000ff",
        }
    ],
    markdown: [
        {
            match: /[<>]/gm,
            mapFunction: (e) => {
                switch (e) {
                    case "<": return "&lt";
                    case ">": return "&gt";
                    default: return e;
                }
            }
        },
        {
            match: /^[ \t]*#{1}[ \t](.*$)/mg,
            mapFunction: (e, text) => `<h1>${text}</h1>`,
        },
        {
            match: /^[ \t]*#{2}[ \t](.*$)/mgi,
            mapFunction: (e, text) => `<h2>${text}</h2>`,
        },
        {
            match: /^[ \t]*#{3}[ \t](.*$)/mgi,
            mapFunction: (e, text) => `<h3>${text}</h3>`,
        },
        {
            match: /^[ \t]*#{4}[ \t](.*$)/mgi,
            mapFunction: (e, text) => `<h4>${text}</h4>`,
        },
        {
            match: /^[ \t]*#{5}[ \t](.*$)/mgi,
            mapFunction: (e, text) => `<h5>${text}</h5>`,
        },
        {
            match: /^[ \t]*#{6}[ \t](.*$)/mgi,
            mapFunction: (e, text) => `<h6>${text}</h6>`,
        },
        {
            match: /`{1}(.*)`{1}/mg,
            mapFunction: (e, text) => `<pre>${text}</pre>`,
        },
        {
            match: /[*_]{2}(.+)[*_]{2}/mg,
            mapFunction: (e, text) => `<strong>${text}</strong>`
        },
        {
            match: /[*_](.+)[*_]/mg,
            mapFunction: (e, text) => `<em>${text}</em>`
        },
        {
            match: /~~(.+)~~/mg,
            mapFunction: (e, text) => `<del>${text}</del>`
        },
        {
            match: /!?\[(.+)]\(.+\)/mg,
            mapFunction: (e, label, link) => `<a href="${link}">${label}</a>`,
        }
    ],
    ignore: [
        {
            match: /^#.*$/gm,
            mapFunction: (e) => `<span class="comment">${e}</span>`
        }
    ],
    properties: [
        {
            match: /^((\w|\\ |)*)[ \t]*=/gm,
            mapFunction: (e, key) => `<span style="color: #ff0000">${key}</span> =`
        },
        {
            match: /^((\w|\\ |)*)[ \t]*:/gm,
            mapFunction: (e, key) => `<span style="color: #ff0000">${key}</span> :`
        },
        {
            match: /^[#!].*$/gm,
            mapFunction: (e) => `<span class="comment">${e}</span>`
        }
    ]
};

function highlightLocally(content: string, data: HighlightData): string {
    let result = content;
    data.keywords.forEach((keyword) => {
        if (typeof keyword.mapFunction === "function") {
            result = result.replace(keyword.match, keyword.mapFunction);
        } else {
            result = result.replace(keyword.match, (match) => `<span style="color: ${ keyword.color }">${ match }</span>`);
        }
    });

    return result;
}

@Injectable({
    providedIn: "root"
})
export class TextHighlightService {
    public highlight(content: string, type: keyof typeof highlightData): string {
        return highlightLocally(content, {keywords: highlightData[type]});
    }
}
