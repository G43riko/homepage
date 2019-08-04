import {AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/storage";
import {UploadTaskSnapshot} from "@angular/fire/storage/interfaces";
import {Observable} from "rxjs";

export class FileUploadWrapper {
    public constructor(public readonly ref: AngularFireStorageReference,
                       public readonly ownedImageTask: AngularFireUploadTask,
                       public readonly sharedImageTask?: AngularFireUploadTask) {

    }

    public get percentageChanges(): Observable<number | undefined> {
        return this.ownedImageTask.percentageChanges();
    }

    public get snapshotChanges(): Observable<UploadTaskSnapshot | undefined> {
        return this.ownedImageTask.snapshotChanges();
    }
}
