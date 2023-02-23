import { Component } from '@angular/core';
import { SearchPipe } from './search.pipe';
import { getISOWeek } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TransactionServiceService } from 'src/app/service/transaction-service.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DashboardService } from 'src/app/service/dashboard.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-in-out-manager',
  templateUrl: './in-out-manager.component.html',
  styleUrls: ['./in-out-manager.component.less'],
})
export class InOutManagerComponent {
  listCatalogue: any[] = [];
  listCatalogueCurrent: any[] = [];
  listOfData = [];
  transactionName: any;
  transactionAmount: any;
  transactionType: any;
  transactionNote: any;
  transactionCategory: any;
  categoryId: any;

  searchValue = '';
  aa: boolean = false;
  setIndex(ii) {
    this.aa = ii;
  }

  onChangeValue(newValue, changedValue) {
    // changedValue = newValue;
    console.log(changedValue);
  }

  inOutcomeSelect = '1';
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

  compareLimit() {}

  isVisible = false;
  comfirmText = 'Tạo mới';

  showModal() {
    this.isVisible = true;
    this.transactionName = '';
    this.transactionType = '';
    this.transactionAmount = '';
    this.transactionCategory = '';
    this.transactionNote = '';
  }

  addTransaction() {
    this.serTransaction
      .addTransaction({
        userId: localStorage.getItem('userId'),
        walletId: localStorage.getItem('walletId'),
        userCategoryId: this.transactionCategory,
        type: Number(this.transactionType),
        amount: Number(this.transactionAmount),
        note: this.transactionNote,
        createAt: Date().toString,
      })
      .subscribe((res: any) => {
        console.log(res);
        this.mess.success(res.message);
        this.getListTransaction();
      });

  }

  handleOk(): void {
    this.isVisible = false;
    this.addTransaction();
  }

  getCategoryId(catalogueSelected: string): number {
    if (catalogueSelected === 'all') {
      this.categoryId = 0;
    } else {
      this.serDashboard
        .getAllCategory(this.serAuth.userId, Number(this.inOutcomeSelect))
        .subscribe((res: any) => {
          res.forEach((element) => {
            if (element.name === catalogueSelected) {
              this.categoryId = element.id;
            }
          });
        });
    }
    return this.categoryId;
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

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(
    private modal: NzModalService,
    private mess: NzMessageService,
    private serTransaction: TransactionServiceService,
    private serAuth: AuthService,
    private serDashboard: DashboardService,
  ) {}

  getListTransaction() {
    this.listOfData = [];
    this.serTransaction
      .getListTransaction(this.serAuth.userId)
      .subscribe((res: any) => {
        console.log(res);
        res.transactions.forEach((element:any) => {
          let item = {
            id: element.id,
            icon: element.userCategory.icon,
            type: element.userCategory.name,
            amount: element.amount,
            note: element.note,
            time: element.createAt,
          };
          this.listOfData.push(item);
        });
      });
  }

  getListCatalogue() {
    this.listCatalogue = [];
    let userId = -1;
    this.serDashboard
      .getAllCategory(localStorage.getItem('userId'), userId)
      .subscribe((res: any) => {
        console.log(res);
        this.listCatalogue = res;
      });
    userId = 1;
    this.serDashboard
      .getAllCategory(localStorage.getItem('userId'), userId)
      .subscribe((res: any) => {
        res.forEach((element) => {
          this.listCatalogue.push(element);
        });
        this.listCatalogueCurrent = this.listCatalogue;
        // this.listOfData.push(...res);
      });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getListTransaction();
    this.getListCatalogue();
  }
}
