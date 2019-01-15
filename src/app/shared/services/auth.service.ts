import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { AppConfig } from "../../app.config";
import { User } from "../models/auth.model";
import { firestore } from "firebase";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    public readonly user$: Observable<User | undefined>;
    private _user: User;

    public constructor(private readonly router: Router,
                       private readonly afAuth: AngularFireAuth,
                       private readonly afs: AngularFirestore) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap((user) => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(undefined);
                }
            }),
        );
    }

    public get access(): string[] {
        return this._user && this._user.access || [];
    }

    public async googleSigning(): Promise<void> {
        const provider = new auth.GoogleAuthProvider();

        const credentials = await this.afAuth.auth.signInWithPopup(provider);
        return this.updateUserData(credentials.user as User);
    }

    public async signOut(): Promise<boolean> {
        await this.afAuth.auth.signOut();
        return this.router.navigate(["/"]);
    }

    private updateUserData(user: any): Promise<void> {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        const providerData                            = user.providerData && user.providerData[0] || {};
        this._user                                    = {
            uid        : user.uid,
            email      : user.email,
            displayName: user.displayName || providerData.displayName || null,
            photoURL   : user.photoURL || providerData.photoURL || null,
        };
        userRef.get().subscribe((e) => {
            console.log("Data: ", e);
        });
        userRef.update({
            access: firestore.FieldValue.arrayUnion(AppConfig.PATH_PROFILE) as any,
        });
        return userRef.set(this._user, {merge: true});
    }
}
