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
  transactionType = '';
  transactionId: any;
  transactionNote: any;
  transactionCategory = '';
  categoryId: any;
  dateTransaction = null;
  editedItem:any;

  searchValue = '';
  aa: boolean = false;
  setIndex(ii) {
    this.aa = ii;
  }

  onChangeValue(newValue, changedValue) {
    changedValue = newValue;
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
  isVisibleUpdate = false;
  comfirmText = 'Xác nhận';

  showModal() {
    this.isVisible = true;
    this.transactionName = '';
    this.transactionType = '';
    this.transactionAmount = '';
    this.transactionCategory = '';
    this.transactionNote = '';
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  onChangeTime(result: Date): void {
    // this.dateTransaction = this.datepipe.transform(result, 'yyyy-MM-dd');
    this.dateTransaction = this.formatDate(result);
    console.log('onChange: ', result);
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
        createAt: this.dateTransaction,
      })
      .subscribe((res: any) => {
        if (res.mess === 'Thêm giao dịch thành công') {
          this.mess.success(res.message);
          this.getListTransaction();
        }
        if (res.mess === 'Vượt hạn mức') {
          this.mess.error(res.message);
        }
      });
  }

  handleOk(): void {
    this.isVisible = false;
    this.addTransaction();
  }


  showModalEdit(data) {
    this.isVisibleUpdate = true;
    this.transactionAmount = data.amount;
    this.transactionCategory = data.category;
    this.transactionNote = data.note;
    this.transactionType = data.type.toString;
    this.transactionId = data.id;
    this.dateTransaction = data.time;
    console.log(this.transactionCategory);
    console.log(this.transactionId);
    console.log(this.transactionType);   
  }

  handleEditOk() {
    this.isVisibleUpdate = false;
    this.updateTransaction();
    
  }

  // "id" : 2,
  //   "userId" : 2,
  //   "walletId" : 2,
  //   "userCategoryId" : 1,
  //   "type" : -1,
  //   "amount" : 12000,
  //   "note" : "ăn chơi sa đọa vs Hà",
  //   "createAt" : "2022-11-11"

  updateTransaction() {
    this.serTransaction.updateTransaction({
      id:   this.transactionId,
      userId: localStorage.getItem('userId'),
      walletId: localStorage.getItem('walletId'),
      userCategoryId: this.transactionCategory,
      type: Number(this.transactionType),
      amount: Number(this.transactionAmount), 
      note: this.transactionNote,
      createAt: this.dateTransaction,
    }).subscribe(
      (res:any)=>{
        console.log(res);
        this.getListTransaction();
      }
    );
  }

  
  handleEditCancel(): void {
    this.isVisibleUpdate = false;
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
    private serDashboard: DashboardService
  ) {}

  getListTransaction() {
    this.listOfData = [];
    this.serTransaction
      .getListTransaction(localStorage.getItem('userId'))
      .subscribe((res: any) => {
        console.log(res);
        res.transactions.forEach((element: any) => {
          let item = {
            id: element.id,
            icon: element.userCategory.icon,
            category: element.userCategory.name,
            amount: element.amount,
            note: element.note,
            time: element.createAt,
            type: element.type
          };
          this.listOfData.push(item);
        });
      });
  }

  getListCatalogue() {
    this.listCatalogue = [];
    let type = -1;
    this.serDashboard
      .getAllCategory(localStorage.getItem('userId'), type)
      .subscribe((res: any) => {
        console.log(res);
        this.listCatalogue = res;
      });
    type = 1;
    this.serDashboard
      .getAllCategory(localStorage.getItem('userId'), type)
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
