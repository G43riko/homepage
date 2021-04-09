export interface TechnologyDetail {
    readonly key: string;
    readonly name: string;
    readonly skill: number;
    readonly type: {
        readonly [language in string]: string;
    };
    readonly homepage: string;
}
