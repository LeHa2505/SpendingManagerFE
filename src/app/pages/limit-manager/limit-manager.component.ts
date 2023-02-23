import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BudgetServiceService } from 'src/app/service/budget-service.service';
import { CategoryManagerService } from 'src/app/service/category-manager.service';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-limit-manager',
  templateUrl: './limit-manager.component.html',
  styleUrls: ['./limit-manager.component.less'],
})
export class LimitManagerComponent {
  listOfData = [];
  userId = localStorage.getItem("userId");
  choosedId :any;

  isVisible = false;
  isEdit = false;
  comfirmText = 'Tạo mới';

  showModal() {
    this.isVisible = true;
    this.limitCash = 0
    this.limitSelected = 0
    this.yearSelected='2023'
    this.monthSelected='02'
  }

  showEditModal(data : any){
    this.isEdit=true
    this.choosedId=data.id;
    this.limitCash = data.amount
    this.limitSelected = data.category.id
    let yearMonth = data.budgetTime.split('-')
    this.yearSelected=yearMonth[0]
    this.monthSelected=yearMonth[1]
  }

  handleOk(): void {
    this.isVisible = false;
    this.addBudget();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isEdit = false;
  }
  handleEditOk(){
    this.isEdit = false;
    this.serBudget.updateListBudget(
      {
        "userId" : this.userId,
        "categoryId" : this.limitSelected,
        "amount" : this.limitCash,
        "budgetTime" : this.yearSelected+'-'+this.monthSelected
      },this.choosedId
    ).subscribe(
      (res:any)=>{
        this.mess.success("Cập nhật thành công");
        this.getListBudget();
      },
      (error:any)=>{
        this.mess.error("Vui lòng thử lại!")
      }
    )
  }

  constructor(
    private modal: NzModalService,
    private serBudget: BudgetServiceService,
    private cate : DashboardService,
    private rou : Router,
    private mess : NzMessageService
  ) {}

  getListBudget() {
    this.serBudget
      .getListBudget(this.userId)
      .subscribe((res: any) => {
        this.listOfData = res;
      });
  }
  addBudget(){
    this.serBudget.addListBudget(
      {
        "userId" : this.userId,
        "categoryId" : this.limitSelected,
        "amount" : this.limitCash,
        "budgetTime" : this.yearSelected+'-'+this.monthSelected
      }
    ).subscribe(
      (res:any)=>{
        this.mess.success("Tạo mới thành công");
        this.getListBudget();
      },
      (error:any)=>{
        this.mess.error("Vui lòng thử lại!")
      }
    )
  }
  getListCategory(){
    this.cate.getAllCategory(this.userId, -1).subscribe(
      (res:any)=>{
        this.limitCashArray = res;
      }
    )
  }

  showDeleteConfirm(data): void {
    // const deleteId = this.listOfData.indexOf(data);
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa?',
      nzContent: '',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.serBudget.deleteListBudget(data.id).subscribe(
          (res:any)=>{
            this.mess.success("Thành công");
            this.getListBudget();
          },
          (error:any)=>{
            this.mess.error("Vui lòng thử lại!")
          }
        )
      },
      nzCancelText: 'Hủy',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.userId) {
      this.getListCategory();
      this.getListBudget();
    }else this.rou.navigateByUrl("/login");
  }

  monthSelected = '02';
  yearSelected = '2023';
  monthArray = [
    { label: 'Tháng 1', value: '01' },
    { label: 'Tháng 2', value: '02' },
    { label: 'Tháng 3', value: '03' },
    { label: 'Tháng 4', value: '04' },
    { label: 'Tháng 5', value: '05' },
    { label: 'Tháng 6', value: '06' },
    { label: 'Tháng 7', value: '07' },
    { label: 'Tháng 8', value: '08' },
    { label: 'Tháng 9', value: '09' },
    { label: 'Tháng 10', value: '10' },
    { label: 'Tháng 11', value: '11' },
    { label: 'Tháng 12', value: '12' },
  ];

  yearArray = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  limitSelected = 1;
  limitCashArray :any = [];
  limitCash = 0
}
