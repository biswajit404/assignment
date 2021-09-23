import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingState } from '../../core/components/loading/loading.component';
import { ConfirmDialogComponent } from '../../core/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';
import * as Globals from '../../core/global';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { getCookie } from '../../core/helper';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  loading: LoadingState = LoadingState.NotReady;
  headerThOption = [];
  userList: any = [];
  totalUser: number;
  defaultPagination: number;
  itemNo: number;
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;
  pageSize: number;
  sort_by = '';
  search_key = '';
  // 
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.itemNo = 0;
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.pageSize = Globals.pageSize;
    this.headerThOption = [
      {
        id: 1,
        name: "First Name",
        code: "first_name",
        sort_type: '',
        has_tooltip: false,
        tooltip_msg: '',
        selected: true
      },
      {
        id: 2,
        name: "Last Name",
        code: "last_name",
        sort_type: '',
        has_tooltip: false,
        tooltip_msg: '',
        selected: true
      },
      {
        id: 3,
        name: "Email",
        code: "email",
        sort_type: '',
        has_tooltip: false,
        tooltip_msg: '',
        selected: true,
      },
    ]
    this.getUserList();
  }

  getUserList() {
    this.loading = LoadingState.Processing
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if (this.itemPerPage) {
      params.set('per_page', this.itemPerPage.toString());
    }
    this.userService.getUserList(params).subscribe(
      res => {
        this.userList = res['data'];
        this.totalUser = res['total'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalUser > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        } else {
          this.upper_count = this.totalUser
        }
        this.loading = LoadingState.Ready
      },
      err => {
        this.loading = LoadingState.Ready
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    );
  }

  pagination() {
    this.loading = LoadingState.Processing;
    this.getUserList();
  }

  
  onListCountSelectionChange(item): void {    
    this.itemPerPage = item;
    this.defaultPagination = 1;
    this.pageSize = this.itemPerPage;
    this.getUserList();
  }

  ShowColunm(column_code){
    var index = this.headerThOption.findIndex(x => x.code == column_code)
    if(index != -1){
      if(this.headerThOption[index]['selected']){
        return true;
      }
      else{
        return false;
      }
    }
  }

  addNew(): void {
    this.router.navigateByUrl('/user/add' );
  }

  edit(item){
    this.router.navigateByUrl('/user/edit/' + item.id );
  }

  view(item){
    this.router.navigateByUrl('/user/details/' + item.id );
  }

  delete(item,i) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      panelClass: ['popup'],
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure want to delete this user?";
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = LoadingState.Processing
        this.userService.deleteUser(item.id).subscribe(
          res => {
            console.log(res)
            this.toastr.success('User Deleted Successfully', '', {
              timeOut: 3000,
            });
            this.userList.splice(i,1)
            this.loading = LoadingState.Ready
          },
          error => {
            console.log(error)
            if (error.error) {
              this.toastr.error(error.error.msg, '', {
                timeOut: 3000,
              });
            }
            else {
              this.toastr.error('Something went wrong', '', {
                timeOut: 3000,
              });
            }
            this.loading = LoadingState.Ready
          }
        )
      }
      dialogRef = null;
    })

  }


}
