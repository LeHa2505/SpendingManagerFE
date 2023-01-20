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
      name: 'Mua sắm',
      time: '20/1/2023'
    },
    {
      name: 'Mua sắm',
      time: '20/1/2023'
    },
    {
      name: 'Mua sắm',
      time: '20/1/2023'
    },
    {
      name: 'Mua sắm',
      time: '20/1/2023'
    }
  ];

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  valueInputCatalogue?: string;
  newItem: any;
  catalogueIcon = 'car';
  catalogueIconArray = ['car', 'medicine-box', 'dollar-circle', 'customer-service']

  addCatalogue(valueInputCatalogue) {
    this.newItem = {
      name: valueInputCatalogue,
      time: (new Date).toString
    }
    this.catalogueIconArray.push()
    console.log(this.catalogueIconArray);
    
  }
}
