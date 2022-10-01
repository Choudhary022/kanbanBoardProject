import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../model/members';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private Url : string = "http://localhost:9090/api/admin/team";
  private Url1 : string = "http://localhost:9090/api/admin/team/member";

  constructor(private httpclient: HttpClient) { }
  saveTeamForUser(data:Team){
    // window.localStorage.getItem('email'this.saveTaskForUser.)
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.post<any>(this.Url+"/addTeam/"+Email,data,{ 'headers': reqHeader });
  };
  deleteTeamForUser(data:any,id:String){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.delete<any>(this.Url+"/deleteTeam/"+Email+"/"+id,{ 'headers': reqHeader });
  };
  getAllTeamForUser(){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.get<any>(this.Url+"/getAllTeam/"+Email,{ 'headers': reqHeader })
  };
  updateTeam(data:Team,teamId:any){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.put<any>(this.Url+"/updateTeam/"+Email+"/"+teamId,data,{ 'headers': reqHeader })
  };



  saveTeamMember(data:Member,teamId:String){
    // window.localStorage.getItem('email'this.saveTaskForUser.)
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.post<any>(this.Url1+"/addTeam/"+Email+"/"+teamId,data,{ 'headers': reqHeader });
  };
  deleteTeamMember(memberId:String,id:String){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.delete<any>(this.Url1+"/deleteTeamMember/"+Email+"/"+id+"/"+memberId,{ 'headers': reqHeader });
  };
  getAllTeamMember(teamId:any){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.get<any>(this.Url1+"/getAllTeamMember/"+Email+"/"+teamId,{ 'headers': reqHeader })
  };
  updateTeamMember(data:Member,teamId:any){
    let Email = window.localStorage.getItem('emailId');
    let reqHeader = new HttpHeaders().set('Authorization','Bearer ' + window.localStorage.getItem('token'));
    return this.httpclient.put<any>(this.Url1+"/updateTeamMember/"+Email+"/"+teamId,data,{ 'headers': reqHeader })
  };

}
