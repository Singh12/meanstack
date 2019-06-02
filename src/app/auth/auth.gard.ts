import { Router, CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    authKey: boolean;
    constructor(private authService: AuthService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.authKey = this.authService.getauthTokenData();
        this.authService.getAuthToken().subscribe(
            auth => {
                this.authKey = auth;
                console.log(this.authKey);
            }
        );
        console.log(this.authKey);
        if (!this.authKey) {
            this.router.navigate(['/']);
        }
        return this.authKey;
    }
}
