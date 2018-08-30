import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

@Injectable()
export class FunctionalAreaService {

  constructor(private http: HttpClient) { }

  getFunctionalAreas() {
    return this.http.get(environment.api + "/api/functionalAreas/getFunctionalAreas");
  }

}
