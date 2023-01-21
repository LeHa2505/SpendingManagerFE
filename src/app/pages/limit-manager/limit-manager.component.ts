import { Component } from '@angular/core';

@Component({
  selector: 'app-limit-manager',
  templateUrl: './limit-manager.component.html',
  styleUrls: ['./limit-manager.component.less']
})
export class LimitManagerComponent {
  listOfData = [
    {
      icon: 'shopping', 
      type: 'Mua sắm',
      time: '1/2023',
      limitcash: 2000000
    },
     {
      icon: 'shopping', 
      type: 'Mua sắm',
      time: '1/2023',
      limitcash: 2000000
    },
     {
      icon: 'shopping', 
      type: 'Mua sắm',
      time: '1/2023',
      limitcash: 2000000
    },
     {
      icon: 'shopping', 
      type: 'Mua sắm',
      time: '1/2023',
      limitcash: 2000000
    }
  ];

  

}
