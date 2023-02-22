import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
  role: any = localStorage.getItem('role');
  name: any = localStorage.getItem('name');
  avatar: string = this.name[0];
  isCollapsed = false;
  menus: any[] = [
    {
      title: 'Trang chủ',
      icon: 'home',
      url: '',
    },
    {
      title: 'Dashboard',
      icon: 'dashboard',
      url: 'dashboard',
    },
    {
      title: 'Quản lý danh mục riêng',
      icon: 'appstore',
      url: 'catalogue-manager',
    },
    {
      title: 'Quản lý thông tin thu chi',
      icon: 'wallet',
      url: 'spending-info-manager',
    },
    {
      title: 'Quản lý hạn mức',
      icon: 'account-book',
      url: 'limitcash-manager',
    }
  ];

  constructor(public auth: AuthService, private route:Router) {}

  ngOnInit(): void {
    if(!this.role){
      this.route.navigateByUrl("/login");
    }
  }
}
