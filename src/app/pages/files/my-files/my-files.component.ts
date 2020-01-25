import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {User} from "../../../shared/models/auth.model";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
    selector: "app-my-files",
    templateUrl: "./my-files.component.html",
    styleUrls: ["./my-files.component.scss"]
})
export class MyFilesComponent implements OnInit {
    public files: Observable<string>[];
    @Input() public type: "shared" | "owned";
    @Output() public onNumberChange = new EventEmitter<number>();

    public constructor(private readonly storage: AngularFireStorage,
                       public readonly authService: AuthService) {
    }

    public ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            if (!user) {
                return;
            }

            this.loadData(user);
        });
    }

    public loadData(user: User): void {
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
            const images = this.storage.storage.ref(`images/${this.type}/${user.uid}/`);
            images.listAll().then((data) => {
                this.onNumberChange.emit(data.items.length);
                this.files = data.items.map((item) => fromPromise(item.getDownloadURL()));
            });
        }
    }

}
