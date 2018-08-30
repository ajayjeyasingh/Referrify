import { AuthService } from './../auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // Activates a route if the user is authenticated.
  // Opposite of AnonGuard
  
  canActivate(): boolean {
    if(this.authService.isUserAuthenticated())
    return true;

    this.router.navigate(['/Login']);

    return false;
  }

}
