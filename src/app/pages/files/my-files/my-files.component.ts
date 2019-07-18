import { Component, OnInit } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";
import { AuthService } from "../../../shared/services/auth.service";

@Component({
    selector: "app-my-files",
    templateUrl: "./my-files.component.html",
    styleUrls: ["./my-files.component.scss"],
})
export class MyFilesComponent implements OnInit {
    public files: Observable<string>[];

    public constructor(private readonly storage: AngularFireStorage,
                       public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            if (!user) {
                return;
            }

            if (user.roles.ROLE_READ_ALL_FILES && false) {
                // const folders = this.storage.storage.ref(`images/`);
                // folders.listAll().then((data) => {
                //     data.items[0].bucket;
                // })
                // const images = this.storage.storage.ref(`images/${user.uid}/`);
                // images.listAll().then((data) => {
                //     this.files = data.items.map((item) => fromPromise(item.getDownloadURL()));
                // });
            } else {
                const images = this.storage.storage.ref(`images/${user.uid}/`);
                images.listAll().then((data) => {
                    this.files = data.items.map((item) => fromPromise(item.getDownloadURL()));
                });
            }
        });

    }

}
