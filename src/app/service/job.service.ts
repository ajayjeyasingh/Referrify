import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable()
export class JobService {

  api = environment.api;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  postJob(job): Observable<number> {
    return this.http.post<number>(this.api + "/api/jobs/post", JSON.stringify(job), this.httpOptions);
  }

  getJob(jobId) {
    return this.http.get(this.api + "/api/jobs/get/" + jobId);
  }

  findJob(query): Observable<any[]> {
    return this.http.post<any[]>(this.api + "/api/jobs/find", JSON.stringify(query), this.httpOptions);
  }
}
