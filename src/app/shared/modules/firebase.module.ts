import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AppStaticConfig } from "../../appStaticConfig";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(AppStaticConfig.FIREBASE_AUTH)
    ],
    exports: [
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule
    ]
})
export class FirebaseModule {
}
