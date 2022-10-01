import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { dateValidator } from 'src/app/model/dateValidator';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  msg: any;
  task:any;
  UpdateTask:FormGroup
  constructor(private kanbanService:UpdateService, private route:ActivatedRoute, private router:Router) { 
    this.UpdateTask=new FormGroup({
      taskId:new FormControl(window.localStorage.getItem('taskId')),
      toDo:new FormControl(window.localStorage.getItem('todo'),[Validators.required]),
      dateAssign:new FormControl((new Date()).toISOString().substring(0,10)),
      dueDate:new FormControl(window.localStorage.getItem('dueDate'),[Validators.required,dateValidator]),
      priority:new FormControl(window.localStorage.getItem('priority')),
      // taskStatus:new FormControl('',[Validators.required])
    });
  }
  todayDate=(new Date()).toISOString().substring(0,10);

  ngOnInit(): void {
  }
  updateTask(){
    this.task=this.UpdateTask.value;
    console.log(window.localStorage.getItem('taskId'));
    console.log(this.UpdateTask.value);
    console.log(this.task)
    this.kanbanService.updateUserTask(this.task,window.localStorage.getItem('taskId')).subscribe(
      response=>{
        console.log("hello"+response);
        this.router.navigate(['/dashboard']);
      },error=>{
          console.log("error "+error)
      }
    )
  }
  logout(){
    this.router.navigateByUrl('/homepage');
  }
  get taskId(){
    return this.UpdateTask.get('taskId')
   }
  get toDo(){
    return this.UpdateTask.get('toDo')
   }
   get dateAssign(){
    return this.UpdateTask.get('dateAssign')
   }
   get dueDate(){
    return this.UpdateTask.get('dueDate')
   }
   get priority(){
    return this.UpdateTask.get('priority')
   }
   get taskStatus(){
    return this.UpdateTask.get('taskStatus')
   }

}
