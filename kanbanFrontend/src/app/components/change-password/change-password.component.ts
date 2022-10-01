import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MustMatch } from './custom-validators';
import * as alertify from 'alertifyjs';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm:FormGroup;
  errorMessage:String="";
  constructor(private loginService:LoginService,private router:Router,private formBuilder: FormBuilder) { 
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl(null,[Validators.required]),
      newPassword: new FormControl(null,[Validators.required,Validators.pattern('"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"')]),
      confirmPassword: new FormControl(null,[Validators.required])
    });
  }

  ngOnInit(): void {
    
  }
  changePassword(){
    let oldPassword = window.localStorage.getItem('password');
    let email = <String> window.localStorage.getItem('emailId');
    if(oldPassword===this.passwordForm.value.currentPassword){
        if(this.passwordForm.value.newPassword===this.passwordForm.value.confirmPassword && this.passwordForm.value.currentPassword!==this.passwordForm.value.confirmPassword){
          this.loginService.updatePassword(email, this.passwordForm.value.newPassword).subscribe(
            response=>{
              console.log("hello"+response);
              this.router.navigate(['/dashboard']);
              window.localStorage.setItem('password',this.passwordForm.value.newPassword);
          // this.router.navigate(['/dashboard']);
          alertify.success('Password Updated Successfully');
            },error=>{
                console.log("error "+error)
            }
          );
          
        }
        else{
          this.errorMessage = "Password Mismatch";
      alertify.error('Password Mismatch');
        }
    }
    else{
      this.errorMessage = "*Incorrect Current Password";
      alertify.error('Incorrect Current Password');
    }

  }
  get currentPassword(){
    return this.passwordForm.get('currentPassword')
   }
   get newPassword(){
    return this.passwordForm.get('newPassword')
   }
   get confirmPassword(){
    return this.passwordForm.get('confirmPassword')
   }
}


