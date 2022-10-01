import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mail } from 'src/app/model/mail';
import { LoginService } from 'src/app/services/login.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  mail: any;
  msg: any;
  email:FormGroup
  constructor(private login: LoginService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.email = new FormGroup({
      emailId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  forgotPassword() {
    this.mail = this.email.value;
    this.login.forgotPassword(this.mail.emailId).subscribe(
      response => {
        this.msg = "**Welcome to Kanban Board Project Management Tool** \n"+"Kanban Board Password For: "+this.mail.emailId + " Is " + response.password;
        let object: Mail = {
          "receiver": this.mail.emailId,
          "messageBody": this.msg,
          "subject": "Kanban Board Password"
        }
        console.log(object)
        this.http.post<any>("http://localhost:9091/sendMail", object)
          .subscribe(
            success => {
              // console.log(success);
              alertify.success("Notification Sent");
              this.router.navigate(['/login']);
            }, error => {
              console.log("error " + error)
            }
          )
          
       
      }
    );
  }
}
