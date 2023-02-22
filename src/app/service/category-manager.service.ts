import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagerService {

  constructor(private http: HttpClient) { }

  getListCategoryUser(userId: any): Observable<any> {
    return this.http.get(environment.BASE_API_URI.CLIENT_ADDRESS + "api/user/category?userId=" + userId);
  }

  addCategoryUser(body:any):Observable<any> {
    return this.http.post(environment.BASE_API_URI.CLIENT_ADDRESS + 'api/user/category', body);
  }

  editCategoryUser(body:any, id:any):Observable<any> {
    return this.http.put(environment.BASE_API_URI.CLIENT_ADDRESS + "api/user/category/" + id, body)
  }

  deleteCategoryUser(id: any):Observable<any>{
    return this.http.delete(environment.BASE_API_URI.CLIENT_ADDRESS + 'api/user/category/' + id)
  }
}
