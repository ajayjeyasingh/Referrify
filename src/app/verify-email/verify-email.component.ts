import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from './../service/email.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  isLoading: boolean = true;
  isError: boolean;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private emailService: EmailService) { }

  ngOnInit() {
    let verificationCode = this.route.snapshot.params.verificationCode;

    if(verificationCode)
    {
      this.emailService.verifyEmail(verificationCode).subscribe(result => {
        this.isLoading = false;
        if(result)
        {
          this.isError = false;
        }
        else
        {
          this.isError = true;
          this.errorMessage = "Please try again after some time."
        }
      }, err => {
        this.isLoading = false;
        this.isError = true;

        if(err.error && err.error.errorMessage)
        this.errorMessage = err.error.errorMessage[0];
        else
        this.errorMessage = "Please try again after some time.";
      });
    }
    else
    {
      this.isLoading = false;
      this.isError = true;

      this.errorMessage = "Please provide a verification code."
    }
  }

}
