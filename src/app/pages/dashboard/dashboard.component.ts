import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';



import { ChartOptions, ChartType, ChartDataset, Scale } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  listBreadCrumb = [
    {
      name: 'Dashboard',
      route: '/dashboard',
    },
  ];

  barChartAccumulatedNumberOfCustomersOptions: ChartOptions = {
    responsive: true,
  };
  barChartAccumulatedNumberOfCustomersLabels: string[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];
  barChartAccumulatedNumberOfCustomersType: ChartType = 'bar';
  barChartAccumulatedNumberOfCustomersLegend = true;
  barChartAccumulatedNumberOfCustomersPlugins = [];
  barChartAccumulatedNumberOfCustomersData: ChartDataset[] = [
    {
      data: [45, 37, 60, 70, 46, 33, 40],
      backgroundColor: '#1890FF',
      borderColor: '#007bff',
      hoverBackgroundColor: '#597a9e',
      label: 'income',
    },
    {
      data: [45, 37, 60, 70, 46, 33, 40],
      backgroundColor: '#F67F9B',
      borderColor: '#007bff',
      hoverBackgroundColor: '#597a9e',
      label: 'outcome',
    },
  ];

  
  // public pieChartType:string = 'pie';
  pieChartNumberOfSpendingOptions: ChartOptions = {
    responsive: true,
  };
  pieChartNumberOfSpendingLabels: string[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];
  pieChartNumberOfSpendingType: ChartType = 'pie';
  pieChartNumberOfSpendingLegend = true;
  pieChartNumberOfSpendingPlugins = [];
  pieChartNumberOfSpendingData: ChartDataset[] = [
    {
      data: [45, 37, 60, 70, 46, 33, 40],
      backgroundColor: ['#93d9d9', '#ffa1b5', '#86c7f3', '#ffe29a', '#f1f2f4', '#fa9092', '#fed29d'],
      borderColor: '#fff',
      hoverBackgroundColor: '#597a9e',
      hoverBorderWidth: 10,
      pointBackgroundColor: '#007bff',
      pointHoverBorderColor: '#007bff',
      tension: 0.35,
      fill: true,
      label: 'income'
    },
  ];
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  validateForm!: UntypedFormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 6 : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }
  constructor(private fb: UntypedFormBuilder){}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    for (let i = 0; i < 10; i++) {
      this.controlArray.push({ index: i, show: i < 6 });
      this.validateForm.addControl(`field${i}`, new UntypedFormControl());
  }
}
}
