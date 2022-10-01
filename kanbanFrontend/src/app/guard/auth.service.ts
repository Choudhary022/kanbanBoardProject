import { Injectable } from '@angular/core';
// import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   isLoggedIn: boolean = false;
   redirectUrl: string | null = null;
   constructor() { }
  //  login() {
  //   if(window.localStorage.getItem('token')!=null){
  //     this.isLoggedIn=true
  //   }
  //  }

  // status: any;
  // constructor() { }
  // IsLoggedIn() {
  //   return !!window.localStorage.getItem('token') 
  // }
}



