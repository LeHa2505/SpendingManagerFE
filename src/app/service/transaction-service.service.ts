import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  constructor(private http:HttpClient, private serAuth: AuthService) { }

  getListTransaction(userId):Observable<any> {
    return this.http.get(environment.BASE_API_URI.CLIENT_ADDRESS + 'api/user/transaction/'+ userId +'/all')
  }

  addTransaction(body:any):Observable<any> {
    return this.http.post(environment.BASE_API_URI.CLIENT_ADDRESS + 'api/user/transaction/add', body)
  }

  updateTransaction(body:any):Observable<any> {
    return this.http.put(environment.BASE_API_URI.CLIENT_ADDRESS + "api/user/transaction/update", body)
  }

  deleteTransaction(id):Observable<any> {
    return this.http.delete(environment.BASE_API_URI.CLIENT_ADDRESS + "api/user/transaction/delete/" + id)
  }
}
