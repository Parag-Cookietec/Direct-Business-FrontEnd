import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { PressCommuniqueForPrinciplePayment } from '../../model/dmo';
import { MarketLoanService } from '../../services/market-loan.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-press-communique-for-principle-payment',
  templateUrl: './press-communique-for-principle-payment.component.html',
  styleUrls: ['./press-communique-for-principle-payment.component.css']
})
export class PressCommuniqueForPrinciplePaymentComponent implements OnInit {

  // variable
  isDetails = false;
  private paginator: MatPaginator;
  private sort: MatSort;
  // date
  todayDate = new Date();
  // form group
  pressCommuniquePaymentForm: FormGroup;

  // table data start
  displayedColumns: string[] = [
    'select',
    'position',
    'transactionDesc',
    'notificationNo',
    'notificationDt',
    'loanStartDt',
    'loanAmount',
    'loanMaturityDt',
  ];
  tableData: PressCommuniqueForPrinciplePayment[] = [];
  dataSource = new MatTableDataSource<PressCommuniqueForPrinciplePayment>(this.tableData);
  // table data end

  // directive object for checkbox
  directiveObj = new CommonDirective(this.route);


  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
  }

  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;


  // constructor
  constructor(private fb: FormBuilder, private route: Router, private marketLoanService: MarketLoanService,
    private datePipe: DatePipe,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.pressCommuniquePaymentForm = this.fb.group({
      fromDate: [''],
      toDate: ['']
    });
  }

  // on click on get details button
  getDetails(offset = null) {
    const param = {
      "pageIndex":offset ? offset : this.pageIndex,
      "pageElement":this.pageSize,
      fromDate : this.pressCommuniquePaymentForm.value.fromDate ? this.datePipe.transform(this.pressCommuniquePaymentForm.value.fromDate, 'yyyy-MM-dd') : null,
      toDate : this.pressCommuniquePaymentForm.value.toDate ? this.datePipe.transform(this.pressCommuniquePaymentForm.value.toDate, 'yyyy-MM-dd') : null
  }; 

    if (this.pressCommuniquePaymentForm.controls['fromDate'].value !== '' &&
      this.pressCommuniquePaymentForm.controls['toDate'].value !== '') {
      this.isDetails = true;
      this.marketLoanService. PressCommuniqueforPrincipalPayment(param).subscribe((res) => {
        if (res && res['status'] === 200 && res['result'] !== '') {
          this.tableData = res['result'].result;
          this.totalRecords = res['result'].totalElement;
          this.dataSource = new MatTableDataSource<PressCommuniqueForPrinciplePayment>(this.tableData);
        }
      },
        (err) => {
          this.toaster.error(err);
        });
    
    }else{
      this.pressCommuniquePaymentForm.markAllAsTouched();
      this.toaster.error('Please fill all mandatory fields.');
    }

  }

  // on click on cancel buttton
  onCancelClick() {
    this.pressCommuniquePaymentForm.reset();
  }

  // Method to for setting data source attributes
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
   
    this.getDetails(this.pageIndex);
  }

}
