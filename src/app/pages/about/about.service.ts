import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map, shareReplay, switchMap } from "rxjs/operators";
import { ProjectDetail } from "./project-detail";
import { TechnologyDetail } from "./technology-detail";

@Injectable()
export class AboutService {
    private readonly baseUrl$ = of("https://g43riko.github.io/data/");

    public readonly projects$ = this.baseUrl$.pipe(
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

    public constructor(
        private readonly httpClient: HttpClient,
    ) {
    }
}
