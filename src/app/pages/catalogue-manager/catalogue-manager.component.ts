import { Component } from '@angular/core';


// interface Catalogue {
//   name: string;
//   time: string;
// }

@Component({
  selector: 'app-catalogue-manager',
  templateUrl: './catalogue-manager.component.html',
  styleUrls: ['./catalogue-manager.component.less']
})
export class CatalogueManagerComponent {
  listOfData = [
    {
      icon: 'car',
      name: 'Đi lại',
      time: '20/1/2023'
    },
    {
      icon: 'medicine-box',
      name: 'Y tế',
      time: '20/1/2023'
    },
    {
      icon: 'dollar-circle',
      name: 'Tiết kiệm',
      time: '20/1/2023'
    },
    {
      icon: 'customer-service',
      name: 'Giải trí',
      time: '20/1/2023'
    }
  ];

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
    this.valueInputCatalogue = '';
    this.catalogueIcon = 'car';
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  valueInputCatalogue: string;
  newItem: any;
  catalogueIcon = 'car';

  addCatalogue(valueInputCatalogue) {
    valueInputCatalogue = this.valueInputCatalogue;
    const newTime = ((new Date).getDay).toString;
    console.log(newTime); 
    
    this.newItem = {
      icon: this.catalogueIcon,
      name: valueInputCatalogue,
      time: newTime,
    }
    this.listOfData.push(this.newItem)
    console.log(this.listOfData);
  }

  onCurrentPageDataChange(listOfCurrentPageData: any[]): void {
    this.listOfData = listOfCurrentPageData;
    console.log(this.listOfData);
    
  }


  handleOk(): void {
     this.isVisible = false;
     this.addCatalogue(this.newItem);
     this.onCurrentPageDataChange(this.listOfData);
    // this.isOkLoading = true;
    // setTimeout(() => {
    //   this.isVisible = false;
    //   this.isOkLoading = false;
    // }, 1000);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('fddfdf'+this.valueInputCatalogue);
    
  }
}
