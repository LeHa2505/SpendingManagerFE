import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.less']
})
export class BlankComponent {
  constructor(private auth : AuthService, private router : Router){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.router.url == '/login') {
      this.auth.isLoginScreen = true;
    }
    if (this.router.url == '/register') {
      this.auth.isRegisterScreen = true;
    }
  }
}
