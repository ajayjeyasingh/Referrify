import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class IndustryService {

  constructor(private http: HttpClient) { }

  getIndustries() {
    return this.http.get(environment.api + "/api/industries/getIndustries");
  }

}
