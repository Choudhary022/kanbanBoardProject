import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/model/signup';
import { SignupService } from 'src/app/services/signup.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpInfo: Signup|any;
  userObj: any;
  userlist: any = [];
  constructor(private signupService:SignupService,private router:Router) { }
  profileForm=new FormGroup({
    fullName:new FormControl('',[Validators.required,Validators.minLength(3)]),
    emailId: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z]+(?:\.[a-zA-Z]+)*$")]),
    password: new FormControl('', [Validators.required,Validators.pattern("^(.{6,20})$")]),
    contact: new FormControl('', [Validators.required,Validators.minLength(10)])
    
    })
    ngOnInit(): void {
    }
  
   
  
    
    
    signupdata() {
     
      // this.userObj = {
      //   name: this.profileForm.value.fullName,
      //   emailId: this.profileForm.value.emailId,
      //   password: this.profileForm.value.password,
      //   contact: this.profileForm.value.contact
      // }
      // this.userlist.push(this.userObj)
      // let obj = new FormData()
      
      this.signUpInfo = this.profileForm.value;
    
      
     this.signupService.registerUser(this.signUpInfo).subscribe(
      a=>{
        console.log(a);
        this.router.navigate(['/login'])
        alertify.success("User registered ... Successfully");
      },
      b=>{
        alertify.error(b);
      });
    }
    
  
    get emailId() {
      return this.profileForm.get('emailId')
    }
    get password() {
      return this.profileForm.get('password')
    }
    get fullName() {
      return this.profileForm.get('fullName')
    }
    get contact() {
      return this.profileForm.get("contact")
    }
  
    

}

