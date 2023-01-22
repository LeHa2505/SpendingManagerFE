import { Component } from '@angular/core';
import { SearchPipe } from './search.pipe';
import { getISOWeek } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-in-out-manager',
  templateUrl: './in-out-manager.component.html',
  styleUrls: ['./in-out-manager.component.less'],
})
export class InOutManagerComponent {
  listOfData = [
    {
      id: '1',
      icon: 'shopping',
      type: 'Mua sắm',
      amount: 200000,
      note: 'Quần áo',
      time: '1/21/2023',
    },
    {
      id: '2',
      icon: 'shopping',
      type: 'Mua sắm',
      amount: 200000,
      note: 'Quần áo',
      time: '1/21/2023',
    },
    {
      id: '3',
      icon: 'shopping',
      type: 'Mua sắm',
      amount: 230000,
      note: 'Quần áo',
      time: '1/21/2023',
    },
    {
      id: '4',
      icon: 'dollar-circle',
      type: 'Tiết kiệm',
      amount: 290000,
      note: 'Quần áo',
      time: '1/21/2023',
    },
    {
      id: '5',
      icon: 'car',
      type: 'Đi lại',
      amount: 100000,
      note: 'Quần áo',
      time: '1/21/2023',
    },
    {
      id: '6',
      icon: 'shopping',
      type: 'Mua sắm',
      amount: 225000,
      note: 'Quần áo',
      time: '1/21/2023',
    },
  ];

  searchValue = '';
  aa: boolean = false;
  setIndex(ii){
    this.aa=ii;
    console.log
  }

  inOutcomeSelect = 'outcome';
  onChangeInOutcome(newValue) {
    this.inOutcomeSelect = newValue;
    console.log(this.inOutcomeSelect);
  }
  date = null;

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  compareLimit(){
    
  }

  isVisible = false;
  comfirmText = 'Tạo mới';    

  showModal() {
    this.isVisible = true;
  }

  showModalEdit(data) {
    this.isVisible = true;
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

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(private modal: NzModalService) {
    
  }
}
