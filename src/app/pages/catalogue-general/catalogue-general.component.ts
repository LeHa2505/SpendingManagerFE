import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  selector: 'app-catalogue-general',
  templateUrl: './catalogue-general.component.html',
  styleUrls: ['./catalogue-general.component.less'],
})
export class CatalogueGeneralComponent {
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
  typeSelected: any;
  userId = localStorage.getItem('userId');

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
      .addListGeneralCategory({
        name: this.valueInputCatalogue,
        icon: this.catalogueIcon,
        type: this.catalogueType,
      })
      .subscribe((res: any) => {
        console.log(res);
        this.mess.success('Tạo mới danh mục thành công!');
        this.getListCatalogue();
      });
  }

  handleOk(): void {
    this.isVisible = false;
    this.addCatalogue();
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

    this.serCatalogue
      .updateListGeneralCategory(
        {
          name: this.valueInputCatalogue,
          icon: this.catalogueIcon,
          type: this.catalogueType,
        },
        this.checkedtemId
      )
      .subscribe((res: any) => {
        console.log(res);
        this.mess.success('Cập nhật thành công!');
        this.getListCatalogue();
      });
    // this.updateEditChange(this.checkedtemId);
  }

  handleEditCancel(): void {
    this.isVisibleEdit = false;
  }

  deleteItem(index: any) {
    // this.listOfData.splice(index, 1);
    this.serCatalogue.deleteGeneralCategory(index).subscribe((res: any) => {
      console.log(res);
      this.mess.success('Xóa thành công!');
      this.getListCatalogue();
    });
  }

  showDeleteConfirm(data): void {
    const deleteId = data.id;
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
    private serCatalogue: CategoryManagerService,
    private mess: NzMessageService,
    private route:Router
  ) {}

  getListCatalogue() {
    this.listOfData = [];
    this.serCatalogue.getListGeneralCategory().subscribe((res: any) => {
      this.listOfData = res;
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (!this.userId) {
      this.route.navigateByUrl('/login');
    } else this.getListCatalogue();
  }
}
