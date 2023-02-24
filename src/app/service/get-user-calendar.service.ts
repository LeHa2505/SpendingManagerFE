import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetUserCalendarService {
  constructor(private http: HttpClient) {}

  getCalendar(body: any): Observable<any>{
    return this.http.post(environment.BASE_API_URI.CLIENT_ADDRESS + 'api/user/calendar', body);    
  }

}
