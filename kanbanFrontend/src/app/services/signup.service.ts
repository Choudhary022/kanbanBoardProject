import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup } from '../model/signup';  

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  apiURL2 = 'http://localhost:9090/api/admin/register';

  constructor(private httpClient: HttpClient) { }

  registerUser(user: Signup):Observable<Signup>{
    return this.httpClient.post<Signup>(this.apiURL2,user)
 }





}
