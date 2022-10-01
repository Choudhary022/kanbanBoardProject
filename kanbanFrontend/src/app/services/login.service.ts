import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL1 = 'http://localhost:9090/api/user/login';
  apiURL2 = 'http://localhost:9090/api/user/forgotPassword/';
  apiURL3 = 'http://localhost:9090/api/admin/task/updatePassword/';
  apiURL4 = 'http://localhost:9090/api/user/updateUser/';
  
  constructor(private httpClient: HttpClient) { }

  add(loginData: Login): Observable<any>{
    return this.httpClient.post<any>(this.apiURL1,loginData);
  }
  forgotPassword(email:String): Observable<any>{
    return this.httpClient.get<any>(this.apiURL2 + email);
  }
  updatePassword(email:String, updateData: String): Observable<any>{
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpClient.post<any>(this.apiURL3 + email,updateData,{ 'headers': reqHeader });
  }
  updatePassword2(email:String, updateData: String): Observable<any>{
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpClient.put<any>(this.apiURL4 + email,updateData,{ 'headers': reqHeader });
  }
  getUserById(): Observable<any>{
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpClient.get<any>('http://localhost:9090/api/admin/task/getUserById/' + Email,{ 'headers': reqHeader });
  }

  logout(){
    window.localStorage.clear();
   }
  
}
