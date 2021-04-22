import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay, switchMap } from "rxjs/operators";
import { ProjectDetail } from "./project-detail";
import { TechnologyDetail } from "./technology-detail";

@Injectable()
export class AboutService {
    private readonly baseUrl$ = of("https://g43riko.github.io/data/");

    public readonly projects$ = this.fetchProjects() || this.baseUrl$.pipe(
        switchMap((url) =>
            this.httpClient.get<ProjectDetail[]>(`${url}/projects.json`, {responseType: "json"})
        ),
        shareReplay(1)
    );

    public readonly technologyData$ = this.baseUrl$.pipe(
        switchMap((url) =>
            this.httpClient.get<{ [key in TechnologyDetail["key"]]: Omit<TechnologyDetail, "key"> }>(`${url}/technologies.json`, {responseType: "json"})
        ),
        shareReplay(1)
    );
    public readonly technologies$   = this.technologyData$.pipe(
        map((data) => Object.entries(data).reduce((acc, [key, value]) => {
            return [...acc, Object.assign({}, value, {key})];
        }, [] as TechnologyDetail[])),
        shareReplay(1),
    );

    private fetchProjects(): Observable<ProjectDetail[]> {
        return this.httpClient.get(
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vSaVQnkVJvR8SNtoOQCIsC3zN9cganv5996edvnp12SceGjZZ7U7-4zLa8zYH14kOnyw4MLaoHwOc1V/pub?gid=0&single=true&output=tsv",
            {
                responseType: "text"
            }).pipe(
            map((content) => this.parseProjectsTsv(content))
        );
    }

    public constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    private parseProjectsTsv(content: string): ProjectDetail[] {
        return content.split("\n").map((row, index) => {
            const [name, subName, team, technologies, tests, web, docs, isPublic, finished, onHomepage, deprecated, github, NPM, codePen, active] = row.split("\t");

            if (!name || !index || !onHomepage || onHomepage.toLowerCase() === "false") {
                return undefined as any;
            }


            const getSource = (): ProjectDetail["sources"] => {
                if (github) {
                    return {
                        url: github,
                        service: "Github",
                    };
                }
                if (codePen) {
                    return {
                        url: codePen,
                        service: "Codepen",
                    };
                }
            };

            return {
                name,
                demo         : web,
                technologies : technologies.split(",").map((e) => e.trim()),
                team         : team as any,
                documentation: docs,
                sources      : getSource(),
            };
        }).filter((e) => !!e);
    }
}
