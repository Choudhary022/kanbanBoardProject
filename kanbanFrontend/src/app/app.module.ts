import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { TaskstatusComponent } from './components/taskstatus/taskstatus.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpdateComponent } from './components/update/update.component';
import { HelpsComponent } from './components/helps/helps.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NewdashboardComponent } from './components/newdashboard/newdashboard.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CarouselModule } from '@coreui/angular';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomepageComponent,
    LoginComponent,
    DashboardComponent,
    EditProfileComponent,
    TaskstatusComponent,
    ForgetpasswordComponent,
    UpdateComponent,
    HelpsComponent,
    ChangePasswordComponent,
    NewdashboardComponent,
    ContactUsComponent,
    AddTeamComponent,
    EditTeamComponent,
    AboutComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule, 
    MatChipsModule,
    ClipboardModule,
    DragDropModule,
    MatTooltipModule,
    MatMenuModule,
    MatGridListModule,
    Ng2SearchPipeModule,
    MatSlideToggleModule,
    CarouselModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
