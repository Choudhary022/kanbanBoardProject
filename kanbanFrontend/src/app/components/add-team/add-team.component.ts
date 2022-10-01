import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  addTeamForm : FormGroup;
  setValue=false;
  public members: any[] = [{
    memberId: '',
    emailId: '',
    name: '',
    contact: ''
  }];
  

  constructor(private router:Router,private loginService:TeamService,private fb: FormBuilder) { 
    this.addTeamForm = this.fb.group({
      teamId:['',[Validators.required]],
      memberList: [this.members,[Validators.required]]
  
    });
  }

  ngOnInit(): void {
  }
  
  // members= this.addTeamForm.controls.memberList as FormArray;
  addMember() {
    this.setValue = true;
    this.members.slice(0);
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
    this.loginService.saveTeamForUser(this.addTeamForm.value).subscribe(a=>{
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
