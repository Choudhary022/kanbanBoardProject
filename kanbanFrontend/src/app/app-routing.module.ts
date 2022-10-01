import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { HelpsComponent } from './components/helps/helps.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { NewdashboardComponent } from './components/newdashboard/newdashboard.component';

import{SignupComponent} from './components/signup/signup.component';
import { TaskstatusComponent } from './components/taskstatus/taskstatus.component';
import { UpdateComponent } from './components/update/update.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
{path:"",redirectTo:'homepage',pathMatch:'full'},
{path:"login",component:LoginComponent},
{path:"signup",component:SignupComponent},
{path:"homepage",component:HomepageComponent},
{path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
{path:"edit-profile",component:EditProfileComponent,canActivate:[AuthGuard]},
{path:"forgetPasssword",component:ForgetpasswordComponent},
{path:"taskstatus",component:TaskstatusComponent,canActivate:[AuthGuard]},
{path:"update",component:UpdateComponent,canActivate:[AuthGuard]},
{path:"help",component:HelpsComponent},
{path:"changePassword",component:ChangePasswordComponent,canActivate:[AuthGuard]},
{path:"newdashboard",component:NewdashboardComponent,canActivate:[AuthGuard]},
{path:"contactus",component:ContactUsComponent},
{path:"addteam",component:AddTeamComponent,canActivate:[AuthGuard]},
{path:"editteam",component:EditTeamComponent,canActivate:[AuthGuard]},
{path:"about",component:AboutComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
