import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.less'],
})
export class DetailInfoComponent {
  oldpasswordVisible = false;
  passwordVisible = false;
  againpasswordVisible = false;
  isVisible = false;
  isVisiblePass = false;
  // isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  showModalEditPass() {
    this.isVisiblePass = true;
    this.oldPassword = '';
    this.password = '';
    this.passwordEnteredAgain = '';
  }

  handleOkPass(): void {
    this.isVisiblePass = false;

    if (this.password === this.passwordEnteredAgain) {
      this.changePassword();
    }
    else {
      this.mess.error("Mật khẩu nhập lại không đúng!");
    }
  }

  handleCancelPass() {
    this.isVisiblePass = false;
  }

  handleOk(): void {
    this.isVisible = false;
    this.updateUserInfo();
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  avatar = '';
  fullName = '';
  firstName = '';
  lastName = '';
  gender = '';
  age = '';
  phoneNumber = '';
  oldPassword = '';
  password = '';
  passwordEnteredAgain = '';
  monthArray = [
    { label: 'Tháng 1', value: '1' },
    { label: 'Tháng 2', value: '2' },
    { label: 'Tháng 3', value: '3' },
    { label: 'Tháng 4', value: '4' },
    { label: 'Tháng 5', value: '5' },
    { label: 'Tháng 6', value: '6' },
    { label: 'Tháng 7', value: '7' },
    { label: 'Tháng 8', value: '8' },
    { label: 'Tháng 9', value: '9' },
    { label: 'Tháng 10', value: '10' },
    { label: 'Tháng 11', value: '11' },
    { label: 'Tháng 12', value: '12' },
  ];

  limitSelected = 'Mua sắm';
  limitCashArray = ['Mua sắm', 'Đi lại', 'Giải trí', 'Thức ăn'];

  constructor(
    private serUser: UserService,
    private mess: NzMessageService,
    private serAuth: AuthService
  ) {}

  getUserInfo() {
    this.serUser
      .getUserInfo(localStorage.getItem('userId'))
      .subscribe((res: any) => {
        console.log(res);
        // this.fullName = res.first_name + " " + res.last_name;
        this.firstName = res.first_name;
        this.lastName = res.last_name;
        this.gender = res.sex;
        this.age = res.date_of_birth;
        this.phoneNumber = res.phone_number;
        this.avatar = res.first_name[0];
      });
  }

  updateUserInfo() {
    this.serUser
      .updateIserInfo(
        {
          date_of_birth: this.age,
          sex: this.gender,
          last_name: this.lastName,
          phone_number: this.phoneNumber,
          first_name: this.firstName,
        },
        localStorage.getItem('userId')
      )
      .subscribe((res: any) => {
        this.mess.success(res.message);
        this.getUserInfo();
        localStorage.setItem('name', this.firstName + ' ' + this.lastName);
        this.serAuth.name =  this.firstName + ' ' + this.lastName;
        this.serAuth.avatar = this.serAuth.name[0];
      });
  }

  changePassword() {
    this.serAuth
      .changePassword({
        userId: localStorage.getItem('userId'),
        oldPass: this.oldPassword,
        newPass: this.password,
      })
      .subscribe((res: any) => {
        console.log(res);
        if (res.message === 'Mật khẩu cũ không chính xác. Vui lòng nhập lại!') {
          this.mess.error(res.message);
        }
        if (res.message === 'Thay đổi mật khẩu thành công!') {
          this.mess.success(res.message);
        }
      });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUserInfo();
  }
}
