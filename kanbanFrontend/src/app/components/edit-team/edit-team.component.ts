import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  addTeamForm : FormGroup;
  setValue=false;
  public members: any[] = [{
    memberId: '',
    emailId: '',
    name: '',
    contact: ''
  }];
  

  constructor(private router:Router,private loginService:TeamService,private fb: FormBuilder,private teamService:TeamService) { 
    this.addTeamForm = this.fb.group({
      teamId:[window.localStorage.getItem('teamId'),[Validators.required]],
      memberList: [this.members,[Validators.required]]
      
    });
  }

  ngOnInit(): void {

    this.teamService.getAllTeamMember(window.localStorage.getItem("tramId")).subscribe(result=>{
      this.members=result;
    })
  }
  
  // members= this.addTeamForm.controls.memberList as FormArray;
  addMember() {
    this.setValue = true;
   this.members.push({
      memberId: '',
    emailId: '',
    name: '',
    contact: ''
    });
  }

  removeMember(uId: number) {
    const index = this.members.findIndex((member) => member.id === uId);
    this.members.splice(index, 1);
  }

  addTeamFormCredentials(){
    console.log(this.addTeamForm.value);
    this.loginService.updateTeam(this.addTeamForm.value,window.localStorage.getItem('teamId')).subscribe(a=>{
      alertify.success("Team Added successfully ");
      this.router.navigate(['/dashboard'])
    },
    b=>{
      console.log(b);
      alertify.error('Add correct credentials');
      
    }
    )
  }

}
