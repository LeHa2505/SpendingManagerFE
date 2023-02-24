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
  isCollapsed = false;
  menus: any[] = [
    {
      title: 'Trang chủ',
      icon: 'home',
      url: '',
      role : 'user'
    },
    {
      title: 'Dashboard',
      icon: 'dashboard',
      url: 'dashboard',
      role:'user'
    },
    {
      title: 'Quản lý danh mục riêng',
      icon: 'appstore',
      url: 'catalogue-manager',
      role:'user'
    },
    {
      title: 'Quản lý thông tin thu chi',
      icon: 'wallet',
      url: 'spending-info-manager',
      role:'user'
    },
    {
      title: 'Quản lý hạn mức',
      icon: 'account-book',
      url: 'limitcash-manager',
      role:'user'
    },
    {
      title: 'Quản lý user',
      icon: 'user',
      url: 'user-manager',
      role:'admin'
    },
    {
      title: 'Quản lý danh mục chung',
      icon: 'area-chart',
      url: 'catalogue-manager-general',
      role:'admin'
    },
  ];

  constructor(public auth: AuthService, private route:Router) {}

  ngOnInit(): void {
    if(!this.role){
      this.route.navigateByUrl("/login");
    }else
    this.auth.name = localStorage.getItem("name")
    this.auth.avatar = this.auth.name[0];
  }
}
