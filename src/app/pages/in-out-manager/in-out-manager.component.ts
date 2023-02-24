import { Component } from '@angular/core';
import { SearchPipe } from './search.pipe';
import { getISOWeek } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TransactionServiceService } from 'src/app/service/transaction-service.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DashboardService } from 'src/app/service/dashboard.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-out-manager',
  templateUrl: './in-out-manager.component.html',
  styleUrls: ['./in-out-manager.component.less'],
})
export class InOutManagerComponent {
  listCatalogue: any[] = [];
  listOfData = [];
  listOfDisplayData = [];
  transactionName: any;
  transactionAmount: any;
  transactionType :any;
  transactionId: any;
  transactionNote: any;
  transactionCategory = '';
  categoryId: any;
  dateTransaction = null;
  editedItem:any;
  warning = false

  searchValue = '';
  aa: boolean = false;
  setIndex(ii) {
    this.aa = ii;
  }

  inOutcomeSelect = 0;
  date = [];

  compareLimit() {}

  isVisible = false;
  isVisibleUpdate = false;
  comfirmText = 'Xác nhận';

  showModal() {
    this.isVisible = true;
    this.transactionName = '';
    this.transactionType = -1;
    this.transactionAmount = '';
    this.transactionCategory = '';
    this.transactionNote = '';
    this.getListCatalogue()
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  formatDate(d: any) {
    let date = new Date(d)
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  onChangeTime(result: Date): void {
    // this.dateTransaction = this.datepipe.transform(result, 'yyyy-MM-dd');
    this.dateTransaction = this.formatDate(result);
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
        createAt: this.formatDate(this.dateTransaction),
      })
      .subscribe((res: any) => {
        if (res.message == 'Thêm giao dịch thành công') {
          this.mess.success(res.message);
        }
        if (res.message == 'Vượt hạn mức') {
          this.mess.error(res.message);
        }
        this.getListTransaction();
      },
      (error:any)=>{
        this.mess.error("Vui lòng thử lại!")
      });
  }

  handleOk(): void {
    this.isVisible = false;
    this.addTransaction();
  }


  showModalEdit(data) {
    this.isVisibleUpdate = true;
    this.transactionAmount = data.amount;
    this.transactionCategory = data.categoryId;
    this.transactionNote = data.note;
    this.transactionType = data.type;
    this.transactionId = data.id;
    this.dateTransaction = data.time;
    this.getListCatalogue()
  }

  handleEditOk() {
    this.isVisibleUpdate = false;
    this.updateTransaction();

  }

  updateTransaction() {
    this.serTransaction.updateTransaction({
      id:   this.transactionId,
      userId: localStorage.getItem('userId'),
      walletId: localStorage.getItem('walletId'),
      userCategoryId: this.transactionCategory,
      type: Number(this.transactionType),
      amount: Number(this.transactionAmount),
      note: this.transactionNote,
      createAt: this.formatDate(this.dateTransaction)+' 00:00:00',
    }).subscribe(
      (res:any)=>{
        if (res.message == 'Cập nhật giao dịch thành công') {
          this.mess.success(res.message);
        }
        if (res.message == 'Vượt hạn mức') {
          this.mess.error(res.message);
          // this.warning=true
        }
        this.getListTransaction();
      },
      (error:any)=>{
        this.mess.error("Vui lòng thử lại!")
      });
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
      nzOnOk: () => this.delete(data),
      nzCancelText: 'Hủy',
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
    private route : Router
  ) {}

  getListTransaction() {
    this.listOfData = [];
    this.serTransaction
      .getListTransaction(localStorage.getItem('userId'))
      .subscribe((res: any) => {
        res.transactions.forEach((element: any) => {
          let item = {
            id: element.id,
            icon: element.userCategory.icon,
            category: element.userCategory.name,
            categoryId : element.userCategory.id,
            amount: element.amount,
            note: element.note,
            time: element.createAt,
            type: element.type
          };
          this.listOfData.push(item);
        });
        this.listOfDisplayData = [...this.listOfData]
      });
  }

  delete(item:any){
    this.serTransaction.deleteTransaction(item.id).subscribe(
      (res:any)=>{
        this.mess.success("Thành công!")
        this.getListTransaction()
      },
      (err:any)=>{
        this.mess.error("Vui lòng thử lại!")
      }
    )
  }

  getListCatalogue() {
    this.serDashboard
      .getAllCategory(localStorage.getItem('userId'), this.transactionType)
      .subscribe((res: any) => {
        this.listCatalogue = res;
      });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (localStorage.getItem("userId")) {
      this.dateTransaction = this.formatDate(new Date());
      this.getListTransaction();
    } else this.route.navigateByUrl("/login")

  }

  search(){
    if (this.inOutcomeSelect != 0) {
      this.listOfDisplayData = this.listOfData.filter((item:any)=>item.type==this.inOutcomeSelect);
    } else this.listOfDisplayData = [...this.listOfData]

    if (this.searchValue!=null) {
      this.listOfDisplayData = this.listOfDisplayData.filter((item:any)=>item.category.toLowerCase().indexOf(this.searchValue.trim().toLowerCase()) > -1 || item.amount.toString().indexOf(this.searchValue.trim().toLowerCase()) > -1);
    }

    if (this.date.length > 0) {
      this.listOfDisplayData = this.listOfDisplayData.filter((item:any)=> Date.parse(item.time) >= Date.parse(this.date[0]));

      this.listOfDisplayData = this.listOfDisplayData.filter((item:any)=>Date.parse(item.time) <= Date.parse(this.date[1]) + Date.parse('02 Jan 1970 00:00:00 GMT'));
    }


  }
}
