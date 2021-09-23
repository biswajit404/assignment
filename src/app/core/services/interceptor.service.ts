import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { getCookie, deleteAllCookies } from '../helper';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    public router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token: string;
    if (getCookie('isLoggedin')) {
      token = getCookie('loggedinToken');
      request = request.clone({ headers: request.headers.set('Authorization', 'Token ' + token) });
    }
    else if(getCookie('guestLoggedin')){
      token = getCookie('loggedinToken');
      request = request.clone({ headers: request.headers.set('Authorization', 'Token ' + token) });
    }
    
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            deleteAllCookies();
            this.router.navigate(['/session-expire'])
          }
        }
        return throwError(error);
      })
    );
  }
}
