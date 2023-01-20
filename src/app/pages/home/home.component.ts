import { Component, OnInit } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    
    console.log(this.date.getDate());
    
  }


  listData: any = [
    { date: 17 ,income: 12000, outcome: 22000 },
    { date: 18, income: 15000, outcome: 200000},
    { date: 19, income: 20000, outcome: 200000},
    { date: 25, income: 23000, outcome: 100000}
  ];



  date = new Date();  
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);    
  }


}
