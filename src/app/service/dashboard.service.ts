import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getPieChart(body:any): Observable<any> {
    return this.http.post(environment.BASE_API_URI.CLIENT_ADDRESS + "api/user/piechart", body);
  }

  getBarChart(body:any):Observable<any> {
    return this.http.post(environment.BASE_API_URI.CLIENT_ADDRESS + "api/user/barchart", body);
  }

  getAllCategory(userId: any, type: any): Observable<any>{
    return this.http.get(environment.BASE_API_URI.CLIENT_ADDRESS + "api/user/allCategory?" + userId + "&" + type)
  }
}
