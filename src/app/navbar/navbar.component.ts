import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed: boolean = true;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    
  }

  logout() {
    this.authService.logout();
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

  navigateToRegister() {
    this.isNavbarCollapsed = true;
    this.router.navigate(['/Register']);
  }

  navigateToLogin() {
    this.isNavbarCollapsed = true;
    this.router.navigate(['/Login']);
  }

}
