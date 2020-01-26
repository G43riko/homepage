import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {UploadTaskSnapshot} from "@angular/fire/storage/interfaces";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {User} from "../../../shared/models/auth.model";
import {AnalyticsService} from "../../../shared/services/analytics.service";
import {AuthService} from "../../../shared/services/auth.service";
import {FileUploadWrapper} from "./file-upload-wrapper";
import {FileUploadService} from "./file-upload.service";

const emptyFileList = {length: 0, item: (index: number) => null};

@Component({
    selector: "app-file-upload",
    templateUrl: "./file-upload.component.html",
    styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent implements OnInit {
    public percentage: Observable<number | undefined>;
    public snapshot: Observable<UploadTaskSnapshot | undefined>;
    public downloadUrl: Observable<string>;
    public isHovering: boolean;
    public accounts: Observable<User[]>;

    public readonly uploadTasks: FileUploadWrapper[] = [];
    public shared: boolean;
    public files: FileList = emptyFileList;
    @Output() public readonly onFileUploaded = new EventEmitter<User>();
    public readonly shareWith = new FormControl();
    public readonly mapper = (e: User) => e ? e.displayName : null;

    public constructor(public readonly authService: AuthService,
                       private readonly snackBar: MatSnackBar,
                       private readonly analyticsService: AnalyticsService,
                       private readonly fileUploadService: FileUploadService) {
    }

    public ngOnInit(): void {
        this.accounts = this.authService.getAccounts();
    }

    public startUpload(event: FileList, user: User): void {
        const sharedWith = this.shared && this.shareWith.value ? this.shareWith.value.uid : null;

        for (let i = 0; i < event.length; i++) {
            const file = event.item(i);
            if (!file) {
                continue;
            }
            this.analyticsService.eventUploadFile(file.name);
            try {
                const uploadTask = this.fileUploadService.uploadFile(file, user, sharedWith);
                const index = this.uploadTasks.length;
                this.uploadTasks.push(uploadTask);
                this.percentage = uploadTask.percentageChanges;
                this.snapshot = uploadTask.snapshotChanges.pipe(finalize(() => {
                    this.downloadUrl = uploadTask.ref.getDownloadURL();
                    this.files = emptyFileList;
                    this.onFileUploaded.emit(user);
                    this.snackBar.open("Súbor bol úspešne nahratý", "Zavrieť");
                    this.uploadTasks.splice(index, 1);
                }));
            }
            catch (uploadError) {
                this.snackBar.open("Pri uploade nastala chyba: " + uploadError, "Zavrieť");
            }
            // this.task = this.fileUploadService.uploadFile(file, user, sharedWith);
            // this.percentage = this.task.percentageChanges();
            // this.snapshot = this.task.snapshotChanges().pipe(finalize(() => {
            //     this.downloadUrl = fromPromise(this.task.task.snapshot.ref.getDownloadURL());
            //     this.files = emptyFileList;
            //     this.onFileUploaded.emit(user);
            //     this.snackBar.open("Súbor bol úspešne nahratý", "Zavrieť", {
            //         duration: AppConfig.DEFAULT_ALERT_DURATION,
            //     });
            // }));
        }
    }

    public isActive(snapshot: UploadTaskSnapshot): boolean {
        return snapshot.state === "running" && snapshot.bytesTransferred < snapshot.totalBytes;
    }

    public checkClick($event: MouseEvent, file_input: HTMLInputElement, uploadButton: HTMLButtonElement): void {
        if ($event.target === uploadButton) {
            return;
        }
        file_input.click();

    }
}
