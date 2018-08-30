import { company } from './../models/company';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  companies;
  user = { company: "" };
  passwordType = "password";

  areCompaniesLoading: boolean = true;

  isEmailDuplicate: boolean;
  isUsernameDuplicate: boolean;

  isEmailDuplicateChecking: boolean;
  isUsernameDuplicateChecking: boolean;

  emailPreviouslyEntered: string = "";
  usernamePreviouslyEntered: string = "";

  isCreatingNewUser: boolean;
  isNewUserCreationSuccess: boolean;

  displayRegistrationForm: boolean = true;


  constructor(private registerService: RegisterService) { }

  passwordToggle() {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
  }

  ngOnInit() {
    this.registerService.getCompanies().subscribe(result => {
      this.areCompaniesLoading = false;
      this.companies = result;
    });
  }

  checkDuplicateEmail(email, domainName) {
    if(email.value.toLowerCase() != this.emailPreviouslyEntered.toLowerCase())
    {
      this.isEmailDuplicate = false;
      this.emailPreviouslyEntered = email.value;

      this.isEmailDuplicateChecking = true;

      this.registerService.checkDuplicateEmail(email.value + "@" + domainName).subscribe(result => {
        this.isEmailDuplicateChecking = false;
        this.isEmailDuplicate = result;
      });
    }
  }

  checkDuplicateUsername(username) {
    if(username.value.toLowerCase() != this.usernamePreviouslyEntered.toLowerCase())
    {
      this.isUsernameDuplicate = false;
      this.usernamePreviouslyEntered = username.value;

      this.isUsernameDuplicateChecking = true;

      this.registerService.checkDuplicateUsername(username.value).subscribe(result => {
        this.isUsernameDuplicateChecking = false;
        this.isUsernameDuplicate = result;
      });
    }
  }

  // Creates a new user in the database
  createUser(form)
  {
    if(form.valid)
    {
      let addUserRequest: any = {};

      addUserRequest.companyId = form.value.company.id;
      addUserRequest.username = form.value.username;
      addUserRequest.email = form.value.email + "@" + form.value.company.domainName;
      addUserRequest.password = form.value.password;

      this.isCreatingNewUser = true;

      this.registerService.createUser(addUserRequest).subscribe(result => {
        this.displayRegistrationForm = false;
        this.isNewUserCreationSuccess = result;
      },
      error => {
        this.displayRegistrationForm = false;
        this.isNewUserCreationSuccess = false;
      });
    }
  }

  test() {

  }

}
