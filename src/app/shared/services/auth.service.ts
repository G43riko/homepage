import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Roles } from "../enums/roles.enum";
import { User } from "../models/auth.model";

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
                }
                return of(undefined);
            }),
        );
    }

    public async googleSigning(): Promise<void> {
        const provider = new auth.GoogleAuthProvider();

        const credentials = await this.afAuth.auth.signInWithPopup(provider);
        return this.updateUserData(credentials.user);
    }

    public async signOut(): Promise<boolean> {
        await this.afAuth.auth.signOut();
        return this.router.navigate(["/"]);
    }

    public canShowMenuItem(user: User, role: "" | Roles[]): boolean {
        return this.checkAuthorization(user, role);
    }

    public checkAuthorization(user: User, allowedRoles: "" | Roles[]): boolean {
        if (allowedRoles === "") {
            return true;
        }
        if (!user) {
            return false;
        }
        for (const role of allowedRoles) {
            if (user.roles[role]) {
                return true;
            }
        }
        return false;
    }

    private updateUserData(user: any): Promise<void> {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        const providerData                            = user.providerData && user.providerData[0] || {};
        this._user                                    = {
            uid        : user.uid,
            email      : user.email,
            displayName: user.displayName || providerData.displayName || null,
            photoURL   : user.photoURL || providerData.photoURL || null,
            roles      : {
                [Roles.ROLE_VISITOR]      : true,
                [Roles.ROLE_VISIT_ABOUT]  : true,
                [Roles.ROLE_VISIT_MOVIES] : true,
                [Roles.ROLE_VISIT_SONGS]  : true,
                [Roles.ROLE_VISIT_PERSONS]: true,
            },
        };
        // userRef.get().subscribe((e) => {
        //     console.log("Data: ", e);
        // });
        // userRef.update({
        //     access: firestore.FieldValue.arrayUnion(AppConfig.PATH_PROFILE) as any,
        // });
        return userRef.set(this._user, {merge: true});
    }
}
