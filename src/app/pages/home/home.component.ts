import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { AuthService } from 'src/app/service/auth/auth.service';
import { GetUserCalendarService } from 'src/app/service/get-user-calendar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    if(!this.userId){
      this.route.navigateByUrl("/login");
    } else
    this.getCalendar();
    if (localStorage.getItem('role') == 'user') {
      this.isUser = true
    }
  }
  constructor(
    private serAuth: AuthService,
    private serCalendar: GetUserCalendarService,
    private route:Router,
  ) {}

  isUser = false;

  listData: any;
  userId = localStorage.getItem('userId');

  date = new Date();
  month = this.date.getMonth();
  year = this.date.getFullYear();
  mode: NzCalendarMode = 'month';

  change(date:any){
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.getCalendar();
  }

  panelChange(change: { date: Date; mode: string }): void {
    console.log('panel')


  }

  getCalendar() {
    this.serCalendar
      .getCalendar({
        "userId": localStorage.getItem('userId'),
        "year": this.year,
        "month": this.month + 1,
      })
      .subscribe((res: any) => {
        this.listData = res;
      });
  }
}
