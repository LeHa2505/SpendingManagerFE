import { Component, Input, OnInit } from '@angular/core';
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

  date = new Date();

  inOutcomeSelect = '1';
  monthSelected = String(this.date.getMonth() + 1);
  yearSelected = String(this.date.getFullYear());
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
    this.getListCategory();
    this.getBarChart();
    this.getcatalogueArray();
  }

  onChange(newValue, changedValue) {
    this.totalAmount = 0;
    this.barChartAccumulatedNumberOfCustomersData[0].data = [];
    changedValue = newValue;
    this.getBarChart();
    this.getListCategory();
    this.getcatalogueArray();
  }

  onChangeCatalogue(newValue) {
    this.totalAmount = 0;
    this.catalogueSelected = newValue;
    this.categoryId = this.getCategoryId(this.catalogueSelected);
    this.getBarChart();
  }

  catalogueSelected = 'all';
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
      label: 'Amount',
    },
    {
      data: [],
      backgroundColor: '#F67F9B',
      borderColor: '#007bff',
      hoverBackgroundColor: '#597a9e',
      label: 'Budget',
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

  //table
  totalAmount = 29000000;
  listOfData: tableData[] = [
    {
      catalogue: 'Ăn uống',
      amount: 100000,
    },
    {
      catalogue: 'Đi lại',
      amount: 200000,
    },
  ];

  totalAmountTime = 0;
  averageAmount: number = 0;
  listOfDataTime: tableDataTime[] = [];
  constructor(
    private serDashborad: DashboardService,
    private serAuth: AuthService
  ) {}

  getBarChart() {
    this.listOfDataTime = [];
    this.serDashborad
      .getBarChart({
        userId: this.serAuth.userId,
        type: Number(this.inOutcomeSelect), //1 là thu, -1 là chi
        in: this.timeSelected, //nhận các giá trị month, year
        year: Number(this.yearSelected),
        month: Number(this.monthSelected),
        categoryId: this.categoryId, //lọc theo id danh mục, nếu 'Tất cả' thì truyền 0
      })
      .subscribe((res: any) => {
        this.barChartAccumulatedNumberOfCustomersLabels = res.labels;
        this.barChartAccumulatedNumberOfCustomersData[0].data = res.amount;
        this.barChartAccumulatedNumberOfCustomersData[1].data = res.budget;
        let month = '';
        let length = res.labels.length;
        for (let index = 0; index < length; index++) {
          if (length > 12) {
            month = 'Ngày ';
          } else month = '';
          let newItem = {
            month: month + res.labels[index],
            amount: res.amount[index],
          };
          this.listOfDataTime.push(newItem);
        }
        
      });
  }

  getCategoryId(catalogueSelected: string): number {
    if ((catalogueSelected ==='all')) {
      this.categoryId = 0;
    }
    else {
      this.serDashborad.getAllCategory(this.serAuth.userId, Number(this.inOutcomeSelect)).subscribe((res: any) => {
        res.forEach((element) => {
          if (element.name === catalogueSelected) {
            this.categoryId = element.id;
          }
        });
      });
    }
      return this.categoryId;
  }

  getcatalogueArray() {
    this.catalogueArray = [];
    let newItem = {
      label: 'All',
      value: 'all',
    };
    this.catalogueArray.push(newItem);
    this.serDashborad
      .getAllCategory(this.serAuth.userId, Number(this.inOutcomeSelect))
      .subscribe((res: any) => {
        res.forEach((element) => {
          newItem = {
            label: element.name,
            value: element.name,
          };
          this.catalogueArray.push(newItem);
        });
      });
  }

  getListCategory() {
    this.pieChartNumberOfSpendingLabels = [];
    this.serDashborad
      .getAllCategory(this.serAuth.userId, Number(this.inOutcomeSelect))
      .subscribe((res: any) => {
        res.forEach((element) => {
          this.pieChartNumberOfSpendingLabels.push(element.name);
        });
      });
  }

  ngOnInit(): void {
    this.getBarChart();
    this.getListCategory();
    this.getcatalogueArray();
  }
}
