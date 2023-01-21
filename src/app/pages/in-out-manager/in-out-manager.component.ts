import { Component } from '@angular/core';
import { SearchPipe } from './search.pipe';
import { getISOWeek } from 'date-fns';


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

  showModal() {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
