import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BudgetServiceService } from 'src/app/service/budget-service.service';

@Component({
  selector: 'app-limit-manager',
  templateUrl: './limit-manager.component.html',
  styleUrls: ['./limit-manager.component.less'],
})
export class LimitManagerComponent {
  listOfData = [];

  isVisible = false;
  comfirmText = 'Tạo mới';

  showModal() {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(
    private modal: NzModalService,
    private serBudget: BudgetServiceService
  ) {}

  getListBudget() {
    this.serBudget
      .getListBudget(localStorage.getItem('userId'))
      .subscribe((res: any) => {
        this.listOfData = res;
      });
  }

  showDeleteConfirm(data): void {
    // const deleteId = this.listOfData.indexOf(data);
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa?',
      nzContent: '',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log(''),
      nzCancelText: 'Hủy',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

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

  yearArray = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  timeSelected = 'year';

  limitSelected = 'Mua sắm';
  limitCashArray = ['Mua sắm', 'Đi lại', 'Giải trí', 'Thức ăn'];
}
