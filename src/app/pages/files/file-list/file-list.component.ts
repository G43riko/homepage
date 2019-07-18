import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";
import { Roles } from "../../../shared/enums/roles.enum";

@Component({
    selector: "app-file-list",
    templateUrl: "./file-list.component.html",
    styleUrls: ["./file-list.component.scss"],
})
export class FileListComponent implements OnInit {
    public readonly Roles = Roles;

    public constructor(public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
    }

}
