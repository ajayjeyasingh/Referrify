import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EmailService {

  api = environment.api;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  verifyEmail(verificationCode): Observable<boolean> {
    return this.http.post<boolean>(this.api + "/api/emails/verifyEmail", JSON.stringify(verificationCode), this.httpOptions);
  }

}
