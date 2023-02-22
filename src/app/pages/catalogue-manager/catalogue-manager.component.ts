import { Component } from '@angular/core';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CategoryManagerService } from 'src/app/service/category-manager.service';
import { DashboardService } from 'src/app/service/dashboard.service';

interface Data {
  name: any;
  icon: any;
  type: any;
  createAt: any;
}

@Component({
  selector: 'app-catalogue-manager',
  templateUrl: './catalogue-manager.component.html',
  styleUrls: ['./catalogue-manager.component.less'],
})
export class CatalogueManagerComponent {
  listOfData: Data[] = [];
  listOfCurrentData: Data[] = [];
  iconArray = [
    'plus-circle',
    'dollar-circle',
    'medicine-box',
    'bell',
    'dribbble-circle',
    'play-circle',
  ];
  catalogueType = 1;
  catalogueTypeArray = [
    { label: 'Thu', value: 1 },
    { label: 'Chi', value: -1 },
  ];
  valueInputCatalogue: string;
  newItem: any;
  catalogueIcon = 'car';
  editedItem: any;
  checkedtemId: any;
  checkedtemType: any;

  isVisible = false;
  isOkLoading = false;

  onChange(newValue, changedValue) {
    changedValue = newValue;
    console.log(changedValue);
  }

  onCurrentPageDataChange(listOfCurrentPageData: Data[]) {
    this.listOfData = listOfCurrentPageData;
  }

  showModal(): void {
    this.isVisible = true;
    this.valueInputCatalogue = '';
    this.catalogueIcon = 'car';
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  addCatalogue() {
    this.serCatalogue
      .addCategoryUser({
        userId: this.serAuth.userId,
        name: this.valueInputCatalogue,
        icon: this.catalogueIcon,
        type: Number(this.catalogueType),
      })
      .subscribe((res: any) => {
        console.log(res);
        console.log(Number(this.catalogueType));
      });
    // if (!(this.newItem.name === '')) {
    //   this.listOfData.push(this.newItem);
    // }
  }

  handleOk(): void {
    this.isVisible = false;
    this.addCatalogue();
    this.getListCatalogue();
  }

  isVisibleEdit = false;

  showModalEdit(editItem) {
    this.checkedtemId = editItem.id;
    this.valueInputCatalogue = editItem.name;
    this.catalogueIcon = editItem.icon;
    this.checkedtemType = editItem.type;
    this.isVisibleEdit = true;
  }

  updateEditChange(editItemId) {
    this.listOfData[Number(editItemId) - 1] = this.editedItem;
  }

  handleEditOk() {
    this.isVisibleEdit = false;
    this.editedItem = {
      id: this.checkedtemId,
      icon: this.catalogueIcon,
      name: this.valueInputCatalogue,
      time: new Date().toLocaleDateString(),
    };

    this.serCatalogue
      .editCategoryUser(
        {
          userId: this.serAuth.userId,
          name: this.valueInputCatalogue,
          icon: this.catalogueIcon,
          type: this.checkedtemType,
        },
        this.checkedtemId
      )
      .subscribe((res: any) => console.log(res));

    this.getListCatalogue();
    // this.updateEditChange(this.checkedtemId);
  }

  handleEditCancel(): void {
    this.isVisibleEdit = false;
  }

  deleteItem(index: number) {
    // this.listOfData.splice(index, 1);
    this.serCatalogue.deleteCategoryUser(index).subscribe((res:any)=>{
      console.log("Da xoa");
      
    })
  }

  showDeleteConfirm(data): void {
    const deleteId = data.id
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

  constructor(
    private modal: NzModalService,
    private serDashboard: DashboardService,
    private serAuth: AuthService,
    private serCatalogue: CategoryManagerService
  ) {}

  getListCatalogue() {
    this.listOfData = [];
    let userId = -1;
    this.serDashboard
      .getAllCategory(this.serAuth.userId, userId)
      .subscribe((res: any) => {
        console.log(res);
        this.listOfData = res;
      });
    userId = 1;
    this.serDashboard
      .getAllCategory(this.serAuth.userId, userId)
      .subscribe((res: any) => {
        res.forEach((element) => {
          this.listOfData.push(element);
        });
        console.log(this.listOfData);
        this.listOfCurrentData = this.listOfData;
        // this.listOfData.push(...res);
      });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getListCatalogue();
  }
}
