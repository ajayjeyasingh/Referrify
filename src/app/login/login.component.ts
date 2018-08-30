import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {};
  passwordType = "password";
  errorMessage;
  isLoginError: boolean;
  isAuthInProgress: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  authenticateUser(form)
  {
    this.isLoginError = false;

    if(form.valid)
    {
      this.isAuthInProgress = true;
      this.authService.authenticateUser(this.user).subscribe(result => {
        this.isAuthInProgress = false;

        if(result != null)
        {
          localStorage.setItem("token", JSON.stringify(result));
          this.router.navigate(['/']);

        }
        else {
          this.isLoginError = true;
          this.errorMessage = "Incorrect Username/Password.";
        }
        
      },err => {
        this.isLoginError = true;
        this.isAuthInProgress = false;
        
        if(err.error && err.error.errorMessage)
          this.errorMessage = err.error.errorMessage[0];
        else
          this.errorMessage = "Oops! Something went wrong. Please try later.";
      });
    }
    else
    {
      this.isLoginError = true;
      this.errorMessage = "Incorrect Username/Password.";
    }
  }

  passwordToggle()
  {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
  }

}
