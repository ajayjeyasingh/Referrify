import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {

  api = environment.api;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http: HttpClient, private router: Router) { }

  authenticateUser(user) {
    return this.http.post(this.api + "/api/auth/login", JSON.stringify(user), this.httpOptions);
  }

  logout() {
    if(localStorage.getItem("token"))
    {
      localStorage.removeItem("token");
      this.router.navigate(['/']);
    }
  }

  isUserAuthenticated(): boolean {
    if(localStorage.getItem("token"))
    return true;

    return false;
  }

  getUsername() {
    let token = this.getDecodedAccessToken();

    if(token == null)
    return null;

    return token.username;
  }

  getDecodedAccessToken() {
    if(!localStorage.getItem("token"))
    return null;

    try {
      return jwt_decode(JSON.parse(localStorage.getItem("token")).token);
    }
    catch(error) {
      return null;
    }
  }

  getUserId() {
    let token = this.getDecodedAccessToken();

    if(token == null)
    return null;

    return token.userId;
  }
}
