import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';


@Injectable()
export class RegisterService {

  api = environment.api;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getCompanies() {
    return this.http.get(this.api + "/api/register/getCompanies");
  }

  checkDuplicateEmail(emailId) : Observable<boolean> {
    return this.http.post<boolean>(this.api + "/api/register/checkDuplicateEmail", JSON.stringify(emailId), this.httpOptions);
  }

  checkDuplicateUsername(username) : Observable<boolean> {
    return this.http.post<boolean>(this.api + "/api/register/checkDuplicateUsername", JSON.stringify(username), this.httpOptions);
  }

  createUser(addUserRequest) : Observable<boolean> {
    return this.http.post<boolean>(this.api + "/api/users", JSON.stringify(addUserRequest), this.httpOptions);
  }

  test() {
  }

}
