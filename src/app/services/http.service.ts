import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // getCalendars() {
  //   // returns error: Failed to load resource: the server responded with a status of 401 ()
  //   // cannot register app with microsoft (admin setting for capgemini ms account)
  //   this.http.get('https://outlook.office.com/api/v2.0/me/calendars').subscribe(
  //     response => {
  //       console.log(response);
  //       this.dataFromOutlook = response;
  //     }
  //   )
  // }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, {responseType: 'blob'});
  }
  
  getMapsList(endPoint: string): Observable<any> {
    return this.http.get(endPoint, {responseType: 'json'});
  }
}
