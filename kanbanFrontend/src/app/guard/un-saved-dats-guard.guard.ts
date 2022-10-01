import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate{
  canDeactivate:()=>Observable<boolean> | Promise<boolean>|boolean
}


@Injectable({
  providedIn: 'root'
})
export class UnSavedDatsGuardGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url:string=currentState.url
      console.log("Current url on CanDeactivate",url);
      console.log(component.canDeactivate());
      
     return component.canDeactivate?component.canDeactivate():true;
    // return component.canDeactivate()?false:true;
  }
  
}
