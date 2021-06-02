import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssService {

  constructor(private http: HttpClient) { }

  getPosition() {
    return this.http.get('http://api.open-notify.org/iss-now.json');
  }

  getPassengers() {
    return this.http.get('http://api.open-notify.org/astros.json');
  }
}
