import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AppConfig } from "../../app.config";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(AppConfig.FIREBASE_AUTH),
    ],
    exports: [
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
    ],
})
export class FirebaseModule {
}
