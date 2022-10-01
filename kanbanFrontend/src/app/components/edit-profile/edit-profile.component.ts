import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/model/signup';
import { User } from 'src/app/model/User';
import { SignupService } from 'src/app/services/signup.service';
import { UpdateService } from 'src/app/services/update.service';
import * as alertify from 'alertifyjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup
 selectedImage:any;
 editedInfo:any;
 url:any;
 userObj:any;
 userlist:any=[];
 message:any;



  constructor(private signUpService:UpdateService,private router:Router,private loginService:LoginService) { 
    this.profileForm=new FormGroup({
      fullName:new FormControl(window.localStorage.getItem('fullName'),[Validators.required,Validators.minLength(3)]),
      emailId:new FormControl({value:window.localStorage.getItem('emailId'),disabled:true },[Validators.required]),
      contact: new FormControl(window.localStorage.getItem('contact'), [Validators.required,Validators.minLength(10)]),
      // image:new FormControl('',[Validators.required])
      });
  }


  


   
  ngOnInit(): void {
  }
  onSubmit(){
   this.editedInfo =<any>this.profileForm.value;
  //  this.editedInfo.emailId = localStorage.getItem('emailId');
   this.editedInfo.password = localStorage.getItem('password');
   console.log(this.editedInfo);
   


   let response = this.signUpService.updateUserdetails(this.editedInfo);
   response.subscribe(
     (success) => {
       this.message = success;
       //alert(success);
       console.log(this.message);
       alertify.success("User updated successfully....");
       this.loginService.getUserById().subscribe(
        data=>{
          window.localStorage.setItem('fullName',data.fullName);
          window.localStorage.setItem('contact',data.contact);
        },error =>{
          console.log(error);
          
        }
      )
       this.router.navigate(['/newdashboard'])
      },
     (error) => {
       alert(error);
       console.log("invalid")
       
     });
    //  this.editedInfo.emailId

  
    
  }

 imageSubmit(event:any)
    {
      console.log(event);
      this.selectedImage=event.target.files[0];
      var reader= new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = (_event)=>{
        this.url = reader.result;

      }
      console.log(this.selectedImage);
      
      console.log("url is here =>"+this.url);
      
      
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
  get image() {
    return this.profileForm.get("image")
  }

}
