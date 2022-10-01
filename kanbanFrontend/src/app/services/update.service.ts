import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from 'src/app/model/task';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private Url : string = "http://localhost:9090/api/admin/task";

  constructor(private httpclient: HttpClient) { }
  saveTaskForUser(data:Tasks){
    // window.localStorage.getItem('email'this.saveTaskForUser.)
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.post<any>(this.Url+"/addTask/"+Email,data,{ 'headers': reqHeader });
  };

  deleteTaskForUser(data:any,id:number){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.delete<any>(this.Url+"/deleteTask/"+Email+"/"+id,{ 'headers': reqHeader });
  };

  increaseTaskStatus(data:any){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.put<any>(this.Url+"/increaseStatus/"+Email,data,{ 'headers': reqHeader })
  };

  decreaseTaskStatus(data:any){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.put<any>(this.Url+"/deleteStatus/"+Email,data,{ 'headers': reqHeader })
  };

  getAllTaskForUser(){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.get<any>(this.Url+"/getAllTaskForParticularUser/"+Email,{ 'headers': reqHeader })
  };

  priorityChange(data:any){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.put<any>(this.Url+"/priority/"+Email,data,{ 'headers': reqHeader })
  };

  updateUserTask(data:Tasks,taskId:any){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.put<any>(this.Url+"/updateUser/"+Email+"/"+taskId,data,{ 'headers': reqHeader })
  };

  changeTaskStatus(data:any,status:any){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.put<any>(this.Url+"/changeStatus/"+Email+"/"+status,data,{ 'headers': reqHeader })
  };




//Updating user details
  url="http://localhost:9090/api/admin/task/updateUser/";
  updateUserdetails(user:any)
  {
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.post<any>(this.url+Email,user,{ 'headers': reqHeader });
  }
}
