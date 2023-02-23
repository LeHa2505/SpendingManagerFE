import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(userId: any): Observable<any>{
    return this.http.get(environment.BASE_API_URI.CLIENT_ADDRESS + 'api/admin/userInfo/' + userId);
  }

  updateIserInfo(body:any, userId:any):Observable<any>{
    return this.http.put(environment.BASE_API_URI.CLIENT_ADDRESS + 'api/admin/userInfo/' + userId, body)
  }

  getListUser():Observable<any>{
    return this.http.get(environment.BASE_API_URI.CLIENT_ADDRESS + 'api/admin/userInfo');
  }

  deleteUser(userId):Observable<any>{
    return this.http.delete(environment.BASE_API_URI.CLIENT_ADDRESS + 'api/admin/user/' + userId);
  }
}
