import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { dateValidator } from 'src/app/model/dateValidator';
import { Mail } from 'src/app/model/mail';
import { UpdateService } from 'src/app/services/update.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-taskstatus',
  templateUrl: './taskstatus.component.html',
  styleUrls: ['./taskstatus.component.css']
})
export class TaskstatusComponent implements OnInit {
  msg: any;
  task:any;
  Tasks:FormGroup
  constructor(private kanbanService:UpdateService, private route:ActivatedRoute, private router:Router, private http: HttpClient) {
    this.Tasks=new FormGroup({
      taskId:new FormControl('',[Validators.required]),
      toDo:new FormControl('',[Validators.required]),
      dateAssign:new FormControl((new Date()).toISOString().substring(0,10)),
      dueDate:new FormControl('',[Validators.required,dateValidator]),
      priority:new FormControl('',[Validators.required]),
      taskStatus:new FormControl('',[Validators.required])
    });
   }
   todayDate=(new Date()).toISOString().substring(0,10);

  ngOnInit(): void {
  }
  addTask(){
    this.task=this.Tasks.value;
    console.log(this.Tasks.value);
    this.kanbanService.saveTaskForUser(this.task).subscribe(
      response=>{
        console.log(response);
        this.msg = "**Welcome to Kanban Board Project Management Tool** \n"+this.task.toDo + "Task Added Successfully";
          let object: Mail = {
            "recipient": window.localStorage.getItem("emailId"),
            "msgBody": this.msg,
            "subject": "Task Status"
          }
          this.http.post<any>("http://localhost:9091/sendMail", object)
            .subscribe(
              (success: any) => {
                
                alertify.success("Task Status Sent Successfully");
              }
            );
        this.router.navigate(['/dashboard']);
      },error=>{
          console.log("error "+error)
          alertify.error("Task Id is Already Exists");
      }
    )
  }

  get taskId(){
    return this.Tasks.get('taskId')
   }
  get toDo(){
    return this.Tasks.get('toDo')
   }
   get dateAssign(){
    return this.Tasks.get('dateAssign')
   }
   get dueDate(){
    return this.Tasks.get('dueDate')
   }
   get priority(){
    return this.Tasks.get('priority')
   }
   get taskStatus(){
    return this.Tasks.get('taskStatus')
   }

}
