import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isUserAuthenticated()
  {
    return this.authService.isUserAuthenticated();
  }

  getUsername() {
    let username: string = this.authService.getUsername();

    if(username == null)
    return "Anonymous User";

    let usernameInLowercase: string = username.toLowerCase();

    return usernameInLowercase.charAt(0).toUpperCase() + usernameInLowercase.slice(1);
  }


}
