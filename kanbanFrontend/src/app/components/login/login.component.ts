import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { LoginService } from 'src/app/services/login.service';
import * as alertify from 'alertifyjs';
import { AuthService } from 'src/app/guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private loginService:LoginService,private router:Router,private authService: AuthService) { }

  loginData:Login| any;
  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    emailId: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });


  

  loginCredential(){
    window.localStorage.clear();
    console.log(this.loginForm.value);
    this.loginData=this.loginForm.value;
    this.loginService.add(this.loginData).subscribe(
      a=>{
        window.localStorage.setItem('token',a.token);
        window.localStorage.setItem('emailId',this.loginData.emailId);
        window.localStorage.setItem('password',this.loginData.password);
        alertify.success("login successfull .... Welcome ");
        this.authService.isLoggedIn = true;
        this.loginService.getUserById().subscribe(
          data=>{
            window.localStorage.setItem('fullName',data.fullName);
            window.localStorage.setItem('contact',data.contact);
          },error =>{
            console.log(error);
            
          }
        )
        this.router.navigateByUrl("/dashboard");
        this.router.navigateByUrl("/newdashboard");
},
b=>{
  console.log(b);
  alertify.error('Username or Password Did Not Match.');
  this.authService.isLoggedIn = false;
  
});

 };
  


}
