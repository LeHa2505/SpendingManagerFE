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
      time: '1/20/2023'
    },
    {
      icon: 'medicine-box',
      name: 'Y tế',
      time: '1/20/2023'
    },
    {
      icon: 'dollar-circle',
      name: 'Tiết kiệm',
      time: '1/20/2023'
    },
    {
      icon: 'customer-service',
      name: 'Giải trí',
      time: '1/20/2023'
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
    const newTime = new Date();    
    this.newItem = {
      icon: this.catalogueIcon,
      name: valueInputCatalogue,
      time: newTime.toLocaleDateString(),
    }
    this.listOfData.push(this.newItem)
  }

  onCurrentPageDataChange(listOfCurrentPageData: any[]): void {
    this.listOfData = listOfCurrentPageData;
    
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

  isVisibleEdit = false;

  showModalEdit() {
    this.isVisibleEdit = true;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.    
  }
}
