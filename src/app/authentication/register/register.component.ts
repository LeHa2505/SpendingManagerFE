import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.auth.isRegisterScreen = false;
  }

  constructor(private fb: UntypedFormBuilder,
     private auth: AuthService,
     private mess: NzMessageService,
     private route:Router
     ) {}

  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      this.auth.signup(
        {
          "firstName" : this.validateForm.controls['firstName'].value,
          "lastName" : this.validateForm.controls['lastName'].value,
          "email" : this.validateForm.controls['email'].value,
          "password" : this.validateForm.controls['password'].value,
          "sex" : this.validateForm.controls['sex'].value,
          "dateOfBirth" : this.formatDate(this.validateForm.controls['dateOfBirth'].value),
          "phoneNumber" : this.validateForm.controls['phoneNumber'].value,
          "amount" : 0
      }
      ).subscribe(
        (res:any)=>{
          if (res.message!='Email đã tồn tại, vui lòng thử lại sau!') {
            this.mess.success(res.message)
            this.auth.isLoginScreen=true
            this.auth.isRegisterScreen=false
            this.route.navigateByUrl("/login")
          }
          else this.mess.info(res.message)

        }
      )
      console.log('submit', this.validateForm.value,this.formatDate(this.validateForm.controls['dateOfBirth'].value));
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  formatDate(d: any) {
    let date = new Date(d)
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      firstName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      amount: [0,[Validators.required]],
      dateOfBirth : [null,[Validators.required]],
    });
  }

}
