import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    this.login();
  }
  signup(){
    this.auth.isRegisterScreen=true
    this.auth.isLoginScreen=false
    this.route.navigateByUrl("/register")
  }

  constructor(private fb: UntypedFormBuilder, private auth: AuthService, private mess: NzMessageService, private route:Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

  }

  login(){
    this.auth.login({
      "email" : this.validateForm.controls['email'].value,
      "password" : this.validateForm.controls['password'].value
    }).subscribe((res:any) => {
      if (res) {
        this.auth.setSession(res);
        this.auth.isLoginScreen = false;
        this.route.navigateByUrl("/");
      }
      else{
        this.mess.error("Email hoặc mật khẩu sai!");
      }
    },
    (error:any) =>{
      this.mess.error("Email hoặc mật khẩu sai!");
    }
    )
  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.auth.isLoginScreen = false;
  }
}
