import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset, Scale } from 'chart.js';

interface tableData {
  catalogue: string;
  amount: number;
}

interface tableDataTime {
  month: string;
  amount: number;
}

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

  inOutcomeSelect = 'outcome';
  monthSelected = '1';
  yearSelected = '2023';
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

  
  yearArray = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  timeSelected = 'year';
  isDisabled = true;

  onChangeTime(newTimeSelected) {
    this.timeSelected = newTimeSelected;
    if (newTimeSelected === 'year') {
      this.isDisabled = true;
    } else this.isDisabled = false;
    console.log(this.isDisabled);
  }

  onChangeInOutcome(newValue) {
    this.inOutcomeSelect = newValue;
    console.log(this.inOutcomeSelect);
  }

  catalogueSelected = 'All';
  catalogueArray = [
    {label: 'Tất cả', value: 'All'},
    {label: 'Ăn uống', value: 'Food'},
    {label: 'Phương tiện', value: 'Transport'},
    {label: 'Mỹ phẩm', value: 'Make-up'},
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
      backgroundColor: [
        '#93d9d9',
        '#ffa1b5',
        '#86c7f3',
        '#ffe29a',
        '#f1f2f4',
        '#fa9092',
        '#fed29d',
      ],
      borderColor: '#fff',
      hoverBackgroundColor: '#597a9e',
      hoverBorderWidth: 10,
      pointBackgroundColor: '#007bff',
      pointHoverBorderColor: '#007bff',
      tension: 0.35,
      fill: true,
      label: '',
    },
  ];
  // events
  // public chartClicked(e: any): void {
  //   console.log(e);
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }

  //table
  totalAmount =   29000000;
  listOfData: tableData[] = [
    {
      catalogue: 'Ăn uống',
      amount: 100000,
    },
    {
      catalogue: 'Tháng 2',
      amount: 200000,
    },
    {
      catalogue: 'Tháng 3',
      amount: 250000,
    },
    {
      catalogue: 'Tháng 4',
      amount: 200000,
    },
    {
      catalogue: 'Tháng 5',
      amount: 200000,
    },
  ];

  totalAmountTime = 29000000;
  averageAmount = 120000000;
  listOfDataTime: tableDataTime[] = [
    {
      month: 'Tháng 1',
      amount: 100000,
    },
    {
      month: 'Tháng 2',
      amount: 200000,
    },
    {
      month: 'Du lịch',
      amount: 250000,
    },
    {
      month: 'Mua sắm',
      amount: 200000,
    },
    {
      month: 'Học tập',
      amount: 200000,
    },
  ];
  constructor() {}
  

  ngOnInit(): void {
    console.log(this.inOutcomeSelect);
  }
}
