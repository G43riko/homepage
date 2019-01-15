import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./shared/services/auth.service";
import { map, take, tap } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    public constructor(private readonly authService: AuthService,
                       private readonly router: Router) {

    }

    public canActivate(next: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.user$.pipe(
            take(1),
            map((user) => Boolean(user)),
            tap((loggedIn) => {
                if (!loggedIn) {
                    console.log("Access denied");
                    this.router.navigate(["/"]);
                }
            }),
        );
    }
}
