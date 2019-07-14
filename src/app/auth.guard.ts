import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./shared/services/auth.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {

    public constructor(private readonly authService: AuthService,
                       private readonly router: Router) {

    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot,
                            state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.check(childRoute, state);
    }

    public canActivate(next: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.check(next, state);
    }

    private check(next: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.user$.pipe(
            take(1),
            map((user) => Boolean(user && this.authService.checkAuthorization(user, next.data.allowedFor))),
            tap((loggedIn) => {
                if (!loggedIn) {
                    console.log("Access denied");
                    this.router.navigate(["/"]);
                }
            }),
        );
    }
}
