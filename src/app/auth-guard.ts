import { CookieService } from 'ngx-cookie-service';
import { Routes, Router, CanActivate } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class AuthGuard implements CanActivate {

    constructor(private router: Router, private cookieService: CookieService) { }

    canActivate(route: Route): boolean {
        console.log(this.cookieService.get('access_token'));
        if (this.cookieService.get('access_token')) {
            return true;
        } else {
            this.router.navigate(['/connexion']);
            return false;
        }
    }
}
