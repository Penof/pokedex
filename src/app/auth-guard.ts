import { Routes, Router, CanActivate } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: Route): boolean {
        if (localStorage.getItem('access_token')) {
            return true;
        } else {
            this.router.navigate(['/connexion']);
            return false;
        }
    }
}
