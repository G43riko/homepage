import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { UploadTaskSnapshot } from "@angular/fire/storage/interfaces";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AppConfig } from "../../../app.config";
import { User } from "../../../shared/models/auth.model";
import { AuthService } from "../../../shared/services/auth.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

const emptyFileList = {length: 0, item: (index: number) => null};

@Component({
    selector: "app-file-upload",
    templateUrl: "./file-upload.component.html",
    styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent implements OnInit {
    public percentage: Observable<number | undefined>;
    public snapshot: Observable<UploadTaskSnapshot | undefined>;
    public downloadUrl: Observable<string>;
    public isHovering: boolean;
    private task: AngularFireUploadTask;
    public accounts: Observable<User[]>;
    public shared: boolean;
    public files: FileList = emptyFileList;
    @Output() public onFileUploaded = new EventEmitter<User>();
    public readonly shareWith = new FormControl();

    public constructor(private readonly storage: AngularFireStorage,
                       public readonly authService: AuthService,
                       private readonly snackBar: MatSnackBar,
                       private readonly notificationService: NotificationService) {
    }

    public readonly mapper = (e: User) => e ? e.displayName : null;

    public ngOnInit(): void {
        this.accounts = this.authService.getAccounts();
    }
    public startUpload(event: FileList, user: User): void {
        for (let i = 0; i < event.length; i++) {
            const file = event.item(i);
            if (file) {
                if (file.type.split("/")[0] !== "image") {
                    this.notificationService.showErrorMessage("Unsupported file format");
                    return;
                }

                const fileName = `${new Date().getTime()}_${file.name}`;
                const pathOwned = `images/owned/${user.uid}/${fileName}`;
                const ref = this.storage.ref(pathOwned);
                const customMetadata = {
                    app: AppConfig.TITLE,
                    uploadedBy: user.uid,
                    active: "true",
                    sharedWith: this.shared && this.shareWith.value ? this.shareWith.value.uid : null,
                };

                if (this.shared && this.shareWith.value) {
                    const pathShared = `images/shared/${this.shareWith.value.uid}/${fileName}`;
                    this.storage.upload(pathShared, file, {customMetadata});
                }
                this.task = this.storage.upload(pathOwned, file, {customMetadata});
                this.percentage = this.task.percentageChanges();
                this.snapshot = this.task.snapshotChanges().pipe(finalize(() => {
                    this.downloadUrl = ref.getDownloadURL();
                    this.files = emptyFileList;
                    this.onFileUploaded.emit(user);
                    this.snackBar.open("Súbor bol úspešne nahratý", "Zavrieť", {
                        duration: 2000,
                    });
                }));
            }
        }
    }

    public isActive(snapshot: UploadTaskSnapshot): boolean {
        return snapshot.state === "running" && snapshot.bytesTransferred < snapshot.totalBytes;
    }

    public checkClick($event: MouseEvent, file_input: HTMLInputElement, upload_button: HTMLButtonElement): void {
        if ($event.target === upload_button) {
            return;
        }
        file_input.click();

    }
}
