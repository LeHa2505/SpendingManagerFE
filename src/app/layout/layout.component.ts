import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
  role: any = 'User';
  avatar: any = 'A';
  isCollapsed = false;
  menus: any[] = [
    {
      title: 'Trang chủ',
      icon: 'home',
      url: '',
    },
    // {
    //   title: 'Quản lý đơn hàng',
    //   icon: 'database',
    //   subMenus: [
    //     {
    //       title: 'Danh sách đơn hàng',
    //       url: `shipping-order-list`,
    //     },
    //     {
    //       title: 'Tạo đơn hàng',
    //       url: `shipping-order-list/create`,
    //     },
    //   ],
    // },
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

  constructor() {}

  ngOnInit(): void {}
}
