import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BudgetServiceService {

  constructor(private http:HttpClient, private serAuth: AuthService) { }

  getListBudget(userId):Observable<any> {
    return this.http.get(environment.BASE_API_URI.CLIENT_ADDRESS + "api/user/budget?userId=" + userId);
  }

  addListBudget(body:any, userId):Observable<any> {
    return this.http.post(environment.BASE_API_URI.CLIENT_ADDRESS + "api/user/budget", body);
  }

  updateListBudget(body:any, id):Observable<any> {
    return this.http.put(environment.BASE_API_URI.CLIENT_ADDRESS + "api/user/budget/" + id, body);
  }

  deleteListBudget(id):Observable<any> {
    return this.http.delete(environment.BASE_API_URI.CLIENT_ADDRESS + "api/user/budget/" + id);
  }
}
