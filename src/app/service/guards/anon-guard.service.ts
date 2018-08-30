import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './../auth.service';

@Injectable()
export class AnonGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  // Anon Guard ACTIVATES a route only when the user is NOT AUTHENTICATED
  // Used mainly for Register and Login routes
  
  canActivate(): boolean {
    if(this.authService.isUserAuthenticated())
    return false;

    return true;
  }

}
