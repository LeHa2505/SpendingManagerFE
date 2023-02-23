import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataset, Scale } from 'chart.js';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CategoryManagerService } from 'src/app/service/category-manager.service';
import { DashboardService } from 'src/app/service/dashboard.service';

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

  userId = localStorage.getItem("userId")
  date = new Date();

  inOutcomeSelect = 1;
  monthSelected = (this.date.getMonth() + 1);
  yearSelected = (this.date.getFullYear());
  monthArray = [
    { label: 'Tháng 1', value: 1 },
    { label: 'Tháng 2', value: 2 },
    { label: 'Tháng 3', value: 3 },
    { label: 'Tháng 4', value: 4 },
    { label: 'Tháng 5', value: 5 },
    { label: 'Tháng 6', value: 6 },
    { label: 'Tháng 7', value: 7 },
    { label: 'Tháng 8', value: 8 },
    { label: 'Tháng 9', value: 9 },
    { label: 'Tháng 10', value: 10 },
    { label: 'Tháng 11', value: 11 },
    { label: 'Tháng 12', value: 12 },
  ];

  // yearArray = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  yearArray = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
  timeSelected = 'year';
  isDisabled = true;

  onChangeTime(newTimeSelected) {
    this.timeSelected = newTimeSelected;
    if (newTimeSelected === 'year') {
      this.isDisabled = true;
    } else this.isDisabled = false;
    this.getBarChart();
    this.getPieChart();
  }

  onChange() {
    this.getBarChart();
    this.getPieChart();
    this.getcatalogueArray();
  }

  onChangeCatalogue() {
    this.getBarChart();
  }

  categoryId: number = 0;
  catalogueArray = [];

  barChartAccumulatedNumberOfCustomersOptions: ChartOptions = {
    responsive: true,
  };
  barChartAccumulatedNumberOfCustomersLabels: string[] = [];
  barChartAccumulatedNumberOfCustomersType: ChartType = 'bar';
  barChartAccumulatedNumberOfCustomersLegend = true;
  barChartAccumulatedNumberOfCustomersPlugins = [];
  barChartAccumulatedNumberOfCustomersData: ChartDataset[] = [
    {
      data: [],
      backgroundColor: '#1890FF',
      borderColor: '#007bff',
      hoverBackgroundColor: '#597a9e',
      label: 'Số tiền',
    },
    {
      data: [],
      backgroundColor: '#F67F9B',
      borderColor: '#007bff',
      hoverBackgroundColor: '#597a9e',
      label: 'Hạn mức',
    },
  ];

  // public pieChartType:string = 'pie';
  pieChartNumberOfSpendingOptions: ChartOptions = {
    responsive: true,
  };
  pieChartNumberOfSpendingLabels: string[] = [];
  pieChartNumberOfSpendingType: ChartType = 'pie';
  pieChartNumberOfSpendingLegend = true;
  pieChartNumberOfSpendingPlugins = [];
  pieChartNumberOfSpendingData: ChartDataset[] = [
    {
      data: [],
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

  //table
  totalAmount = 29000000;
  listOfData: any[] = []

  totalAmountTime = 0;
  averageAmount: number = 0;
  listOfDataTime: tableDataTime[] = [];
  constructor(
    private serDashborad: DashboardService,
    private serAuth: AuthService,
    private route : Router
  ) {}

  getBarChart() {
    this.serDashborad
      .getBarChart({
        userId: this.userId,
        type: Number(this.inOutcomeSelect), //1 là thu, -1 là chi
        in: this.timeSelected, //nhận các giá trị month, year
        year: Number(this.yearSelected),
        month: Number(this.monthSelected),
        categoryId: this.categoryId, //lọc theo id danh mục, nếu 'Tất cả' thì truyền 0
      })
      .subscribe((res: any) => {
        this.totalAmountTime = 0
        this.listOfDataTime = [];
        this.barChartAccumulatedNumberOfCustomersLabels = res.labels;
        this.barChartAccumulatedNumberOfCustomersData[0].data = res.amount;
        this.barChartAccumulatedNumberOfCustomersData[1].data = res.budget;
        let month = '';
        let length = res.labels.length;
        for (let index = 0; index < length; index++) {
          this.totalAmountTime+=res.amount[index]
          if (length > 12) {
            month = 'Ngày ';
          } else month = '';
          let newItem = {
            month: month + res.labels[index],
            amount: res.amount[index],
          };
          this.listOfDataTime.push(newItem);
        }
        this.averageAmount=this.totalAmountTime/res.amount.length
      });
  }


  getPieChart() {
    this.totalAmount = 0
    this.serDashborad
      .getPieChart({
        userId: this.userId,
        type: Number(this.inOutcomeSelect), //1 là thu, -1 là chi
        in: this.timeSelected, //nhận các giá trị month, year
        year: Number(this.yearSelected),
        month: Number(this.monthSelected),
        categoryId: this.categoryId, //lọc theo id danh mục, nếu 'Tất cả' thì truyền 0
      })
      .subscribe((res: any) => {
        this.pieChartNumberOfSpendingLabels = res.labels;
        this.pieChartNumberOfSpendingData[0].data = res.data;
        let length = res.labels.length;
        this.listOfData = [];
        for (let index = 0; index < length; index++) {
          this.totalAmount+=res.data[index]
          let newItem = {
            category:  res.labels[index],
            amount: res.data[index],
          };
          this.listOfData.push(newItem);
        }
        console.log(this.listOfData)
      });
  }


  getcatalogueArray() {
    this.catalogueArray = [];
    let newItem = {
      label: 'All',
      value: 0,
    };
    this.catalogueArray.push(newItem);
    this.serDashborad
      .getAllCategory(this.userId, Number(this.inOutcomeSelect))
      .subscribe((res: any) => {
        res.forEach((element) => {
          newItem = {
            label: element.name,
            value: element.id,
          };
          this.catalogueArray.push(newItem);
        });
      });
  }

  ngOnInit(): void {

    if (this.userId) {
      this.getBarChart();
      this.getPieChart()
      this.getcatalogueArray();
    } else this.route.navigateByUrl("/login")
  }
}
