import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.less'],
})
export class DetailInfoComponent {
  isVisible = false;
  // isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
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

  constructor(private serUser: UserService, private mess: NzMessageService,) {}

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
    this.serUser.updateIserInfo(
      {
        date_of_birth: this.age,
        sex: this.gender,
        last_name: this.lastName,
        phone_number: this.phoneNumber,
        first_name: this.firstName,
      },
      localStorage.getItem('userId')
    ).subscribe((res:any)=>{
        this.mess.success(res.message);
        this.getUserInfo();
        // localStorage.setItem('name', this.firstName);
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUserInfo();
  }
}
