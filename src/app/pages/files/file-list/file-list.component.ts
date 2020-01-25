import {Component, OnInit, QueryList, ViewChildren} from "@angular/core";
import {Roles} from "../../../shared/enums/roles.enum";
import {User} from "../../../shared/models/auth.model";
import {AuthService} from "../../../shared/services/auth.service";
import {MyFilesComponent} from "../my-files/my-files.component";

@Component({
    selector: "app-file-list",
    templateUrl: "./file-list.component.html",
    styleUrls: ["./file-list.component.scss"]
})
export class FileListComponent implements OnInit {
    public owned = 0;
    public shared = 0;
    @ViewChildren(MyFilesComponent) public readonly children: QueryList<MyFilesComponent>;
    public readonly Roles = Roles;

    public constructor(public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
    }

    public uploadComplete(user: User): void {
        this.children.forEach((child) => child.loadData(user));
    }

}
