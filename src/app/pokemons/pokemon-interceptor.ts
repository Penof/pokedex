import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';


export class PokemonInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.url.includes('/trainers/me/team')) {
            console.log('INTERCEPTOR');
            const token = localStorage.getItem('access_token');

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
