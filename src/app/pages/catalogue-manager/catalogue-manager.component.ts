import { Component } from '@angular/core';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzModalService } from 'ng-zorro-antd/modal';

// interface Catalogue {
//   name: string;
//   time: string;
// }

@Component({
  selector: 'app-catalogue-manager',
  templateUrl: './catalogue-manager.component.html',
  styleUrls: ['./catalogue-manager.component.less'],
})
export class CatalogueManagerComponent {
  listOfData = [
    {
      id: '1',
      icon: 'car',
      name: 'Đi lại',
      time: '1/20/2023',
    },
    {
      id: '2',
      icon: 'medicine-box',
      name: 'Y tế',
      time: '1/20/2023',
    },
    {
      id: '3',
      icon: 'dollar-circle',
      name: 'Tiết kiệm',
      time: '1/20/2023',
    },
    {
      id: '4',
      icon: 'customer-service',
      name: 'Giải trí',
      time: '1/20/2023',
    },
  ];

  iconArray = ['car', 'dollar-circle', 'medicine-box', 'customer-service'];

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
  editedItem: any;
  checkedtemId: any;

  addCatalogue(valueInputCatalogue) {
    valueInputCatalogue = this.valueInputCatalogue;
    const newTime = new Date();
    this.newItem = {
      id: this.listOfData.length + 1,
      icon: this.catalogueIcon,
      name: valueInputCatalogue,
      time: newTime.toLocaleDateString(),
    };
    if (!(this.newItem.name === '')) {
      this.listOfData.push(this.newItem);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: any[]): void {
    this.listOfData = listOfCurrentPageData;
  }

  handleOk(): void {
    this.isVisible = false;
    this.addCatalogue(this.newItem);
    this.onCurrentPageDataChange(this.listOfData);
  }

  isVisibleEdit = false;

  showModalEdit(editItem) {
    this.checkedtemId = editItem.id;
    this.valueInputCatalogue = editItem.name;
    this.catalogueIcon = editItem.icon;
    this.isVisibleEdit = true;
  }

  updateEditChange(editItemId) {
    this.listOfData[Number(editItemId) - 1] = this.editedItem;
  }

  handleEditOk(): void {
    this.isVisibleEdit = false;
    this.editedItem = {
      id: this.checkedtemId,
      icon: this.catalogueIcon,
      name: this.valueInputCatalogue,
      time: new Date().toLocaleDateString(),
    };
    this.updateEditChange(this.checkedtemId);
    this.onCurrentPageDataChange(this.listOfData);
    console.log(this.valueInputCatalogue);
    console.log(this.checkedtemId);
    console.log(this.editedItem);
  }

  handleEditCancel(): void {
    this.isVisibleEdit = false;
  }

  deleteItem(index: number) {
    this.listOfData.splice(index, 1);
    this.onCurrentPageDataChange(this.listOfData);
  }

  showDeleteConfirm(data): void {
    const deleteId = this.listOfData.indexOf(data);
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa?',
      nzContent: '',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteItem(deleteId),
      nzCancelText: 'Hủy',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  constructor(private modal: NzModalService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
