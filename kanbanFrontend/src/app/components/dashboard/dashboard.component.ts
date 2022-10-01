
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateService } from 'src/app/services/update.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { Status } from 'src/app/model/status';
import * as alertify from 'alertifyjs';
import { Tasks } from 'src/app/model/task';
import { Mail } from 'src/app/model/mail';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  useDefault:boolean=false;
  ToDoList: Tasks[] = [];
  Research: Tasks[] = [];
  InProgress: Tasks[] = [];
  Review: Tasks[] = [];
  Completed: Tasks[] = [];
  AllTask: Tasks[] = [];
  count: Number=0;
  ToDoCount:Number=0;
  ResearchCount:Number=0;
  InProgressCount:Number =0;
  ReviewCount:Number=0;
  CompletedCount:Number=0;
  msg: any;
  images: any;
  userImage: any;
  searchTask:any;
  jump:any;
  changeStatus!:Status[];
  task:any;
  color = 'primary';
  imageUrl1:any;
  selectedFile:any;
  event1:any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  name:any;
  validImage:boolean = false;
  // imageUrl2 = "/assets/motu.jpg";
  
  value:boolean = false;
  showFiller = false;
  toggleTeamDropdown:boolean=false;
  toggleMemberDropdown:boolean=false;
  toggleMemberDropdown1:boolean=false;
  totalTeams:any[]=[];
  teamCount:number=0;
  memberCount:number=0;
  memberList:any[]=[];
  dynamicTeamId:any;
 
  
  constructor(private kanbanservice: UpdateService, private route:ActivatedRoute, private router:Router
    ,private loginservices:LoginService,private httpClient: HttpClient,private breakpointObserver: BreakpointObserver,private teamService:TeamService) {
      
   }
   
   toggelDropdown(){
    this.toggleTeamDropdown = !this.toggleTeamDropdown;
    // if(this.toggleTeamDropdown && this.teamCount!=0){
    //   document.getElementsByClassName("dropdown-container")[0].setAttribute("style","display:flex; flex-direction:column")
    // }else{
    //   // alertify.error("Team Not Found");
    //   document.getElementsByClassName("dropdown-container")[0].setAttribute("style","display:none")
    // }
  }

  toggelMemberDropdown(){
      this.toggleMemberDropdown=!this.toggleMemberDropdown;
      // if(this.toggleMemberDropdown && this.teamCount!=0){
      //   document.getElementsByClassName("dropdown-container")[1].setAttribute("style","display:flex; flex-direction:column;")
      // }else{
      //   // alertify.error("Team Not Found");
      //   document.getElementsByClassName("dropdown-container")[1].setAttribute("style","display:none")
      // }
    }
    toggelTeamMemberDropdown(u:any){
      this.teamService.getAllTeamMember(u.teamId).subscribe(result => {
        console.log(result);
        this.dynamicTeamId = u.teamId;
        this.memberCount = result.length;
        this.memberList = result;
      })
      this.toggleMemberDropdown1=!this.toggleMemberDropdown1;
      
      // if(this.toggleMemberDropdown1){
      //   document.getElementsByClassName("dropdown-container")[2].setAttribute("style","display:flex; flex-direction:column")
      // }else{
      //   document.getElementsByClassName("dropdown-container")[2].setAttribute("style","display:none")
      // }
    }

   
  ngOnInit(): void {
    this.loginservices.getUserById().subscribe(
      data=>{
        this.name = data.fullName;
      },error =>{
        console.log(error);
        
      }
    )
    this.teamService.getAllTeamForUser().subscribe(result => {
      console.log(result);
      this.totalTeams = result;
      this.teamCount = this.totalTeams.length;
      this.memberList = result.memberList;
    })


    //  this.teamService.getAllTeamMember().subscribe(result => {
    //   this.totalTeams = result;
    //   this.teamCount = this.totalTeams.length;})
    this.changeStatus=[
      {value:"Todo",status:0},
      {value:"Research",status:1},
      {value:"In-progress",status:2},
      {value:"Review",status:3},
      {value:"Completed",status:4}
    ];
    this.kanbanservice.getAllTaskForUser().subscribe(result => {
      this.AllTask = result;
      this.count = this.AllTask.length;

      let email=<String>window.localStorage.getItem('emaild');
      let response=this.loginservices.getUserById();

      response.subscribe(
        res => {
          this.receivedImageData = res;
          this.base64Data = this.receivedImageData.image;
          this.imageUrl1 = 'data:image/jpeg;base64,' + this.base64Data;
          this.validImage = true;
        }
      );
      console.log("id" + result);
      console.log("length" + this.count);
      this.AllTask.forEach(tasks => {
        if (tasks.taskStatus == 0) {
          this.ToDoList.push(tasks);
        }
        else if (tasks.taskStatus == 1) {
          //this.ToDoList.pop();
          this.Research.push(tasks);
        }
        else if (tasks.taskStatus == 2) {
          this.InProgress.push(tasks);
        }
        else if (tasks.taskStatus == 3) {
          this.Review.push(tasks);
        }
        else if (tasks.taskStatus == 4) {
          this.Completed.push(tasks);
        }

      });
      this.ToDoCount=this.ToDoList.length;
      this.ResearchCount=this.Research.length;
      this.InProgressCount=this.InProgress.length;
      this.ReviewCount=this.Review.length;
      this.CompletedCount=this.Completed.length;
      console.log("tL"+this.ToDoCount);
      console.log("RC"+this.ResearchCount);
      console.log("IP"+this.InProgressCount);
      console.log("ReC"+this.ResearchCount);
      console.log("CC"+this.CompletedCount);
    })
    
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  onChange(event:MatSlideToggleChange) {
    // console.log('toggle', event.checked);
        // this.useDefault = event.checked;
        if(this.useDefault==true){
          console.log(this.useDefault);
          
          let object: Mail = {
            "receiver": window.localStorage.getItem("emailId"),
            "messageBody": "Congratularions Your Notification  Service Enabled Successfully",
            "subject": "Notification Enabled"
          }
          this.httpClient.post<any>("http://localhost:9091/sendMail", object)
            .subscribe(
              (success: any) => {
                // console.log(success);
                alertify.success("Notification Enabled Mail sent successfully");
              }
            );
    
        }
  } 
  
 logout(){
   this.router.navigateByUrl('/homepage');
 }

 updateTask(u:Tasks){
   console.log("taskid"+u.taskId ,u.dueDate, u.priority, u.toDo);
   window.localStorage.setItem("taskId",(u.taskId).toString());
   window.localStorage.setItem("todo",u.toDo);
   window.localStorage.setItem("dueDate",u.dueDate);
   window.localStorage.setItem("priority",u.priority);
   this.router.navigate(['/update'])
 }
 deleteTask(u:any){
   this.kanbanservice.deleteTaskForUser(u,u.taskId).subscribe(
     success=>{
       console.log("deleted");
       alertify.success("Successfully Deleted");
       // this.Refresh();
       
       this.router.navigate(['/newdashboard']);  
     },error=>{
       console.log("not deleted");
       alertify.error("Not Done")
     }
   )
 }
 deleteTeam(u:any){
  this.teamService.deleteTeamForUser(u,u.teamId).subscribe(
    success=>{
      console.log("deleted");
      alertify.success("Successfully Deleted");
      // this.Refresh();
      
      this.router.navigate(['/newdashboard']);  
    },error=>{
      console.log("not deleted");
      alertify.error("Not Done")
    }
  )
}
deleteTeamMember(v:any){
  this.teamService.deleteTeamMember(v.memberId,this.dynamicTeamId).subscribe(
    success=>{
      console.log("deleted");
      alertify.success("Successfully Deleted");
      // this.Refresh();
      
      this.router.navigate(['/newdashboard']);  
    },error=>{
      console.log("not deleted");
      alertify.error("Not Done")
    }
  )
}
editTeam(u:any){
  window.localStorage.setItem("teamId",u.teamId)
  this.router.navigate(['/editteam']);  
}



 moveForward(u:any){

   this.kanbanservice.increaseTaskStatus(u).subscribe(
     success=>{
       console.log("Increased");
       alertify.success("Successfully Done");
       if (u.taskStatus == 3) {

         this.msg = u.toDo + " is completed";
         let object: Mail = {
           "recipient": window.localStorage.getItem("email"),
           "msgBody": this.msg,
           "subject": "Your Task is completed"
         }
         this.httpClient.post<any>("http://localhost:9091/sendMail", object)
           .subscribe(
             (success: any) => {
               // console.log(success);
               alertify.success("Notification Sent");
             }
           );
       }
       // this.listservice.getToDoList();
       // this.Refresh();
       // this.ngOnInit();
       this.router.navigate(['/newdashboard']);
     },error=>{
       console.log("Not Increased");
       alertify.error("Not Forwarded")
       
     }
   )
 }

 moveBackward(u:any){
   this.kanbanservice.decreaseTaskStatus(u).subscribe(
     success=>{
       console.log("Decreased");
       alertify.success("Successfully Done");
       // this.ngOnInit();
       // this.Refresh();
       this.router.navigate(['/newdashboard']);
     },error=>{
       console.log("Not Decreased");
       alert("Not decre.")
     }
   )
 }

 logOut(){
   this.loginservices.logout();
   this.router.navigateByUrl('/homepage');
   alertify.success("Logged Out Successfully..");
 }

 changeTaskStatus(u:Tasks,status:number) {
   this.kanbanservice.changeTaskStatus(u,status).subscribe(
     success => {
       console.log("Changed");
       alertify.success("Successfully Changed");
       // this.ngOnInit();
       // this.Refresh();
       this.router.navigate(['/newdashboard']);
     }, error => {
       console.log("Not changed");
       alertify.error("Not Changed")
     }
   )
 }

 onTaskSelected(val:any){
   // console.log(u);
   this.task=val;
   console.log(this.task);

   // this.changeTaskStatus(u,val)
 }
 
 getTask(u:Tasks){
   // this.changeTaskStatus(u,this.task);
   this.kanbanservice.changeTaskStatus(u,this.task).subscribe(
     success => {
       console.log("Changed");
       alertify.success("Successfully Changed");
       // this.ngOnInit();
       // this.Refresh();
       this.router.navigate(['/newdashboard']);
     }, error => {
       console.log("Not changed");
       alertify.error("Not Changed")
     }
   )
 }
 triggered(){
   this.value = !this.value;
 }
 

 public  onFileChanged(event:any) {
   console.log(event);
   this.selectedFile = event.target.files[0];

   // Below part is used to display the selected image
   let reader = new FileReader();
   reader.readAsDataURL(event.target.files[0]);
   reader.onload = (event2) => {
     this.imgURL = reader.result;
 };

}


// This part is for uploading
onUpload() {
 const uploadData = new FormData();
 uploadData.append('myFile', this.selectedFile, this.selectedFile.name);


 this.httpClient.put('http://localhost:9090/api/admin/updateImage/'+<String>window.localStorage.getItem("emailId"), uploadData)
 .subscribe(
              res => {console.log(res);
                     //  this.receivedImageData = res;
                      alertify.success("User Profile Updated");
                     //  this.base64Data = this.receivedImageData.pic;
                     //  this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
                     //  window.localStorage.setItem('image',this.convertedImage);
                      this.router.navigate(['/newdashboard']);
                     //  this.imageUrl1 = this.convertedImage;
                      },
              err => console.log('Error Occured duringng saving: ' + err.map)
           );


}

}
