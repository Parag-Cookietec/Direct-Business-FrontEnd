import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MarketLoanApproved } from '../../model/dmo';
import { MarketLoanService } from '../../services/market-loan.service';
import { getMarketLoanObject } from '../../model/market-loan.data-model';
import { ToastMsgService } from '../../services/toast.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-market-loan-approved',
  templateUrl: './market-loan-approved.component.html',
  styleUrls: ['./market-loan-approved.component.css']
})
export class MarketLoanApprovedComponent implements OnInit {

  marketLoanApprovedForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();

  // table data
  element_data: MarketLoanApproved[] = [];

  dataSource;
  showDetails:boolean = false;

  displayedColumns: any[] = [
    'position',
    'sanctionNo',
    'loanSanctionDate',
    'loanReceiptDate',
    'loanAmount',
    'loanTenureYears',
    'moratoriumPeriodYears',
    'interestRate'
    ];

    private paginator: MatPaginator;
    private sort: MatSort;

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
      // this.paginator = mp;
      // this.setDataSourceAttributes();
    }
  
    totalRecords: number = 0;
    pageSize: number = 5;
    pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router, private _toster: ToastMsgService, private datePipe: DatePipe
    , private _marketLoanService: MarketLoanService) { }

  ngOnInit() {
    this.marketLoanApprovedForm = this.fb.group({
      sanctionNo: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

  fetchApprovedList(offset = null) {
    if (this.marketLoanApprovedForm.valid) {
      this.showDetails =true;
      const param = {
        "pageIndex":offset ? offset : this.pageIndex,
        "pageElement":this.pageSize,
        "adviceNo": this.marketLoanApprovedForm.value.adviceNo ? this.marketLoanApprovedForm.value.adviceNo : null,
        "fromDate": this.marketLoanApprovedForm.value.fromDate ? this.datePipe.transform(this.marketLoanApprovedForm.value.fromDate, 'yyyy-MM-dd') : null,
        "toDate": this.marketLoanApprovedForm.value.toDate ? this.datePipe.transform(this.marketLoanApprovedForm.value.toDate, 'yyyy-MM-dd') : null
    };  
      this._marketLoanService.fetchMarketLoanApprovedList(param).subscribe((res: any) => {
        if (res && res['status'] === 200) {
          this.element_data = [];
          const data = res && res.result ? res.result : null;
          const { size, totalElement, result, totalPage } = data;
          this.pageSize = size;
          this.totalRecords = res['result'].totalElement;
          data.forEach(element => {
            this.element_data.push(getMarketLoanObject(element))
          });
          this.dataSource = new MatTableDataSource<any>(this.element_data);
        }
      });
    } else {
      this.marketLoanApprovedForm.markAllAsTouched();
      this._toster.error('Please fill all mandatory fields.');
    }
  }

  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  
    this.fetchApprovedList(this.pageIndex);
  }

  cancel() {
    this.router.navigate(['dashboard/dmo/market-loan-received']);
  }

  onApprove() {
    this.router.navigate(['dashboard/dmo/market-loan-approved/approve']);
  }
}
