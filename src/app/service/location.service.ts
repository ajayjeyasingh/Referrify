import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations() {
    return this.http.get(environment.api + "/api/locations/getLocations");
  }

}
