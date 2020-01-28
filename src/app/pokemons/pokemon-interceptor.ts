import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable()
export class PokemonInterceptor implements HttpInterceptor {

    constructor(private cookieService: CookieService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.url.includes('/trainers/me/team')) {
            console.log('INTERCEPTOR');
            const token = this.cookieService.get('access_token');
            const authReq = req.clone({setHeaders: {
                    Authorization : `Bearer ${token}`
                }
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
     }
  }
