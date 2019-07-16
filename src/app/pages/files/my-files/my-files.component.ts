import { Component, OnInit } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";

@Component({
    selector: "app-my-files",
    templateUrl: "./my-files.component.html",
    styleUrls: ["./my-files.component.scss"],
})
export class MyFilesComponent implements OnInit {
    public files: Observable<string>[];

    public constructor(private readonly storage: AngularFireStorage) {
    }

    public ngOnInit(): void {
        const images = this.storage.storage.ref("images");

        images.listAll().then((data) => {
            this.files = data.items.map((item) => fromPromise(item.getDownloadURL()));
        });

    }

}
