export type Teams = "FIIT" | "HOME" | "QBSW" | "SOFTEC" | "IBL";
type Technologies = string | "NodeJS" | "Angular" | "Typescript" | "Java" | "NestJS" | "MongoJS";

export interface ProjectDetail {
    readonly team: Teams;
    readonly name: string;
    readonly demo: string;
    readonly sources?: { url: string, service: string};
    readonly documentation?: string;
    readonly technologies: readonly Technologies[];
}
