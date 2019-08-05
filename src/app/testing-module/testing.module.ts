import {CommonModule} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgModule} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireAuthMockService} from "./angular-fire-auth-mock.service";
import {AngularFireStorageMockService} from "./angular-fire-storage-mock.service";
import {AngularFirestoreMockService} from "./angular-firestore-mock.service";

@NgModule({
    imports: [],
    declarations: [],
    providers: [
        {provide: AngularFirestore, useClass: AngularFirestoreMockService},
        {provide: AngularFireAuth, useClass: AngularFireAuthMockService},
        {provide: AngularFireStorage, useClass: AngularFireStorageMockService},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
    ],
    exports: [
        BrowserAnimationsModule,
        BrowserModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientTestingModule,
    ],
})
export class TestingModule {
}
