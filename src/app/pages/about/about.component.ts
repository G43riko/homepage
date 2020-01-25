import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AboutData } from "./about.data";


@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
    public readonly infos = AboutData.infos;
    public readonly languages = AboutData.languages;
    public readonly technologies = AboutData.technologies;
    public readonly items = AboutData.accounts;
    public readonly works = AboutData.works;
    public readonly schools = AboutData.schools;

    public constructor(public readonly translateService: TranslateService) {

    }
    public ngOnInit(): void {
    }

}
