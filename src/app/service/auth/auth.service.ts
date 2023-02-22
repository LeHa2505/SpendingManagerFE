import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoginScreen = false;
  isRegisterScreen = false;

  userId = 1;

  constructor(private http: HttpClient) {}

  login(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.CLIENT_ADDRESS + 'api/auth/login',
      body
    );
  }

  setSession(authResult:any) {
    localStorage.setItem('userId', authResult.id);
    localStorage.setItem('email', authResult.email);
    localStorage.setItem('name', authResult.name);
    localStorage.setItem('role', authResult.role);
    localStorage.setItem('walletId', authResult.walletId);
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('walletId');
  }
}