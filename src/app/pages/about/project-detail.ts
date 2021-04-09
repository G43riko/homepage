type Teams = "fiit" | "home" | "qbsw" | "softec" | "ibl";
type Technologies = string | "NodeJS" | "Angular" | "Typescript" | "Java" | "NestJS" | "MongoJS";

export interface ProjectDetail {
    readonly team: Teams;
    readonly name: string;
    readonly demo: string;
    readonly sources?: string;
    readonly documentation?: string;
    readonly technologies: readonly Technologies[];
}
