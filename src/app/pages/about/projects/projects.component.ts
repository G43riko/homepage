import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AboutData } from "../about.data";

@Component({
    selector: "app-projects",
    templateUrl: "./projects.component.html",
    styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
    public readonly projects = AboutData.projects;

    public constructor(public readonly translateService: TranslateService) {
    }

    public ngOnInit(): void {
    }


}
