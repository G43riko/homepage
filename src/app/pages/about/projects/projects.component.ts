import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AboutData } from "../about.data";
import { AboutService } from "../about.service";

@Component({
    selector: "app-projects",
    templateUrl: "./projects.component.html",
    styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
    public readonly projects$ = this.aboutService.projects$;

    public constructor(private readonly aboutService: AboutService,
                       public readonly translateService: TranslateService) {
    }

    public ngOnInit(): void {
    }


}
