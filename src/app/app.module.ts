import { JobService } from './service/job.service';
import { FunctionalAreaService } from './service/functional-area.service';
import { LocationService } from './service/location.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './service/register.service';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { LoginComponent } from './login/login.component';

import { AnonGuardService as AnonGuard } from './service/guards/anon-guard.service';
import { AuthGuardService as AuthGuard } from './service/guards/auth-guard.service';
import { AuthService } from './service/auth.service';
import { EmailService } from './service/email.service';
import { PostJobComponent } from './job/post-job/post-job.component';
import { IndustryService } from './service/industry.service';
import { ViewJobComponent } from './job/view-job/view-job.component';
import { FindJobComponent } from './job/find-job/find-job.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    VerifyEmailComponent,
    LoginComponent,
    PostJobComponent,
    ViewJobComponent,
    FindJobComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    NgbModule,
    ConfirmDialogModule,
    DialogModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'Register', component: RegisterComponent, canActivate: [ AnonGuard ] },
      { path: 'VerifyEmail/:verificationCode', component: VerifyEmailComponent },
      { path: 'Login', component: LoginComponent, canActivate: [ AnonGuard ] },
      { path: 'Job/Post', component: PostJobComponent, canActivate: [ AuthGuard ] },
      { path: 'Job/Find', component: FindJobComponent },
      { path: 'Job/:jobId', component: ViewJobComponent }
    ],{ useHash: true })
  ],
  providers: [
    RegisterService,
    EmailService,
    AuthService,
    LocationService,
    IndustryService,
    FunctionalAreaService,
    JobService,
    ConfirmationService,
    AnonGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
