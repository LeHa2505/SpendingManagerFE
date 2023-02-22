import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginScreen = false;
  isRegisterScreen = false;

  userId = 1;
  

  constructor() { }
}
