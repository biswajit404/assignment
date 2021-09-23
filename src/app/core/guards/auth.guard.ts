import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getCookie } from '../helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var isLoggedin = (getCookie('isLoggedin') == "true" ? true : false);   
      let url = state.url.split('?')[0]
      var queryParams: AnyObject = {}
      queryParams = Object.assign({}, next.queryParams)
      queryParams.url = url
      if (isLoggedin) {
        return true;
      }
      else {
        if(Object.keys(queryParams).length > 0){
          this.router.navigate(['/login'],{ queryParams: queryParams});
        }
        else{
          this.router.navigate(['/login']);
        }      
        return false;
      }
  }
  
}

interface AnyObject {
  [key: string]: any
}
