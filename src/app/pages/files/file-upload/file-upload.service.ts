import {Injectable} from "@angular/core";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {AppConfig} from "../../../app.config";
import {User} from "../../../shared/models/auth.model";
import {AuthService} from "../../../shared/services/auth.service";
import {FileUploadWrapper} from "./file-upload-wrapper";

const IMAGES_FOLDER = "images";
const IMAGES_OWNED_PREFIX = "owned";
const IMAGES_SHARED_PREFIX = "shared";

interface CustomMetadata {
    [key: string]: string;

    sharedWith: string;
    app: string;
    uploadedBy: string;
    active: string;
}

@Injectable({
    providedIn: "root"
})
export class FileUploadService {

    public constructor(private readonly storage: AngularFireStorage,
                       public readonly authService: AuthService) {
    }

    private checkFileFormat(file: File): void {
        if (file.type.split("/")[0] !== "image") {
            throw new Error("Unsupported file format");
            // this.notificationService.openErrorNotification("Unsupported file format");
            // return;
        }
    }

    private getCustomMetadata(user: User, sharedWith: string): CustomMetadata {
        return {
            sharedWith,
            app: AppConfig.TITLE,
            uploadedBy: user.uid,
            active: "true"
        };
    }

    private getUniqueFileNameFromFile(file: File): string {
        return `${new Date().getTime()}_${file.name}`;
    }

    public uploadFile(file: File, user: User, sharedWith: string): FileUploadWrapper {
        this.checkFileFormat(file);

        const fileName = this.getUniqueFileNameFromFile(file);
        const pathOwned = `${IMAGES_FOLDER}/${IMAGES_OWNED_PREFIX}/${user.uid}/${fileName}`;
        const customMetadata = this.getCustomMetadata(user, sharedWith);

        let sharedImageTask: AngularFireUploadTask | undefined;
        if (sharedWith) {
            const pathShared = `${IMAGES_FOLDER}/${IMAGES_SHARED_PREFIX}/${sharedWith}/${fileName}`;
            sharedImageTask = this.storage.upload(pathShared, file, {customMetadata});
        }

        return new FileUploadWrapper(this.storage.ref(pathOwned), this.storage.upload(pathOwned, file, {customMetadata}), sharedImageTask);
    }
}
