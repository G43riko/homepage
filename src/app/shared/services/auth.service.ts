import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {auth} from "firebase/app";
import {Observable, of} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {switchMap} from "rxjs/operators";
import {Roles} from "../enums/roles.enum";
import {User} from "../models/auth.model";
import {AnalyticsService} from "./analytics.service";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    public readonly user$: Observable<User | undefined>;
    private localUser: User;

    public constructor(private readonly router: Router,
                       private readonly afAuth: AngularFireAuth,
                       private readonly analyticsService: AnalyticsService,
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
        this.analyticsService.login("google");

        return this.updateUserData(credentials.user);
    }

    public getToken(): string {
        return "";
    }

    public async signOut(): Promise<boolean> {
        await this.afAuth.auth.signOut();
        this.analyticsService.signOut();

        return this.router.navigate(["/"]);
    }

    public canShowMenuItem(user: User, role: "" | Roles[]): boolean {
        return this.checkAuthorization(user, role);
    }

    public checkAuthorization(user: User, allowedRoles: "" | Roles | Roles[]): boolean {
        if (allowedRoles === "") {
            return true;
        }
        if (!user) {
            return false;
        }
        if (!Array.isArray(allowedRoles)) {
            allowedRoles = [allowedRoles];
        }
        for (const role of allowedRoles) {
            if (user.roles[role]) {
                return true;
            }
        }

        return false;
    }

    public getAccounts(): Observable<User[]> {
        // return this.afs.collection("users").get().toPromise();
        return this.afs.collection("users").valueChanges() as any;
    }

    public updateRole(role: any, user: any, checked: boolean): Observable<void> {
        return fromPromise(this.afs.doc(`users/${user.uid}`).set({
            roles: {
                [role]: checked,
            },
        }, {merge: true}));
    }

    public updateFavouriteRestaurant(user: any, restaurantKey: string, operation: "add" | "remove"): Observable<void> {
        const ref = this.afs.doc<User>(`users/${user.uid}`);

        return ref.get().pipe(
            switchMap((data) => {
                const userData = data.data() as User;
                if (userData) {
                    if (operation === "add") {
                        userData.favoriteRestaurants = Array.from(new Set([...(userData.favoriteRestaurants || []), restaurantKey]));
                    } else if (operation === "remove" && Array.isArray(userData.favoriteRestaurants)) {
                        userData.favoriteRestaurants.splice(userData.favoriteRestaurants.indexOf(restaurantKey), 1);
                    } else {
                        userData.favoriteRestaurants = Array.isArray(userData.favoriteRestaurants) ? userData.favoriteRestaurants : [];
                    }
                }

                return fromPromise(ref.set(userData, {merge: true}));
            })
        );
    }

    private updateUserData(user: any): Promise<void> {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        const providerData = user.providerData && user.providerData[0] || {};
        this.localUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || providerData.displayName || null,
            photoURL: user.photoURL || providerData.photoURL || null,
            roles: {
                [Roles.ROLE_VISITOR]: true,
                [Roles.ROLE_VISIT_ABOUT]: true,
                [Roles.ROLE_VISIT_MOVIES]: true,
                [Roles.ROLE_VISIT_SONGS]: true,
                [Roles.ROLE_VISIT_ACCOUNTS]: true,
                [Roles.ROLE_VISIT_PERSONS]: true,
            },
        };
        // userRef.get().subscribe((e) => {
        //     console.log("Data: ", e);
        // });
        // userRef.update({
        //     access: firestore.FieldValue.arrayUnion(AppConfig.PATH_PROFILE) as any,
        // });
        return userRef.set(this.localUser, {merge: true});
    }
}
