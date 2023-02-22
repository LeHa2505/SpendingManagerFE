import { Component, OnInit } from '@angular/core';
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
    console.log(this.date.getMonth() + 1);
    this.getCalendar();
  }
  constructor(
    private serAuth: AuthService,
    private serCalendar: GetUserCalendarService
  ) {}

  listData: any;

  date = new Date();
  month = this.date.getMonth();
  year = this.date.getFullYear();
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    this.month = this.date.getMonth();
    console.log(change.date, change.mode);
  }

  getCalendar() {
    this.serCalendar
      .getCalendar({
        "userId": this.serAuth.userId,
        "year": this.year,
        "month": this.month + 1,
      })
      .subscribe((res: any) => {
        console.log(res);
        this.listData = res;
      });
  }
}
