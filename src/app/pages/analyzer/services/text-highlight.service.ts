import { Injectable } from "@angular/core";

interface KeywordData {
    match: RegExp;
    color?: string;
    mapFunction?: (...params: any[]) => string;
}

export interface HighlightData {
    keywords: KeywordData[];
}

const createAnyRegex = (data: string[], {prefix = "", suffix = "", flags  = "g"}): RegExp => {
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
        },
        {
            match: /^#.*$/gm,
            mapFunction: (e) => `<span class="comment">${e}</span>`
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
            match: /^\s*#{1}\s(.*$)/mg,
            mapFunction: (e, text) => `<h1>${text}</h1>`,
        },
        {
            match: /^\s*#{2}\s(.*$)/mgi,
            mapFunction: (e, text) => `<h2>${text}</h2>`,
        },
        {
            match: /^\s*#{3}\s(.*$)/mgi,
            mapFunction: (e, text) => `<h3>${text}</h3>`,
        },
        {
            match: /^\s*#{4}\s(.*$)/mgi,
            mapFunction: (e, text) => `<h4>${text}</h4>`,
        },
        {
            match: /^\s*#{5}\s(.*$)/mgi,
            mapFunction: (e, text) => `<h5>${text}</h5>`,
        },
        {
            match: /^\s*#{6}\s(.*$)/mgi,
            mapFunction: (e, text) => `<h6>${text}</h6>`,
        },
        {
            match: /`{3}((.|\n|\r)*?)`{3}/mg,
            mapFunction: (e, text) => `<pre>${text}</pre>`,
        },
        {
            match: /`{1}(.*?)`{1}/mg,
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
            match: /\s*-\s+\[ ]\s+/mg,
            mapFunction: () => `<br><input type="checkbox" disabled>`
        },
        {
            match: /\s*-\s+\[x]\s+/mgi,
            mapFunction: () => `<br><input type="checkbox" checked disabled>`
        },
        // "aaaaaaaaa-".replace(/((a{3})*?)-/g, function(){console.log(arguments); return arguments[1].replace(/a{3}/g, "_") + "A"})
        /*
        {
            match: /(( {3}|\t)*?)-/g,
            mapFunction: (match, spaces, ...rest) => spaces.replace(/( {3}|\t)/g, "\t - " + rest[rest.length - 1]),
        },
         */
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
    sql: [
        {
            match: /--.*$/gm,
            mapFunction: (e) => `<span class="comment">${e}</span>`
        },
        {
            match: createAnyRegex(["SELECT", "FROM", "WHERE", "JOIN", "ORDER", "BY", "DISTINCT", "GROUP", "LEFT", "RIGHT", "INNER", "OUTER", "ON", "AS", "\\|\\|", "&&", "="], {prefix:"\\s", suffix:"\\s", flags: "gmi"}),
            color: "#ff0000",
        },
    ],
    properties: [
        {
            match: /^((\w|\\ |)*)\s*=/gm,
            mapFunction: (e, key) => `<span style="color: #ff0000">${key}</span> =`
        },
        {
            match: /^((\w|\\ |)*)\s*:/gm,
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
