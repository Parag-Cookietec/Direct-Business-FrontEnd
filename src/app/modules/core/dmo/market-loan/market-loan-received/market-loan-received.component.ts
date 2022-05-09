import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MarketLoanReceived } from '../../model/dmo';
import { MarketLoanService } from '../../services/market-loan.service';
import { getMarketListObject } from '../../model/market-loan.data-model';
import { DatePipe } from '@angular/common';
import { ToastMsgService } from '../../services/toast.service';

@Component({
  selector: 'app-market-loan-received',
  templateUrl: './market-loan-received.component.html',
  styleUrls: ['./market-loan-received.component.css']
})
export class MarketLoanReceivedComponent implements OnInit {

  // Table data for Market Loan Received Table
  public element_data: MarketLoanReceived[] = [];

  // Table Columns for Market Loan Received Table
  displayedColumns: any[] = [
    'position',
    'memoNo',
    'adviceNo',
    'dpDate',
    'adviceDate',
    'adviceBy',
    'transactionDescription',
    'creditAmount',
    'addDetailStatus'
  ];

  showTable = false;
  marketLoanReceivedForm: FormGroup;
  todayDate = Date.now();
  dataSource;
  RequestObejct;

  // Initialize Paginator
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
   }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
  }

  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router, private datePipe: DatePipe, private _toster: ToastMsgService
    , private _marketLoanService: MarketLoanService) { }

  ngOnInit() {
    this.marketLoanReceivedForm = this.fb.group({
      fromDate: [''],
      toDate: ['']
    });
  }

  getDetails(offset = null) {
    if (this.marketLoanReceivedForm.valid) {
  
    const param = {
      "pageIndex":offset ? offset : this.pageIndex,
      "pageElement":this.pageSize,
      "sortByColumn":"1",
      "sortOrder": "ASC",
      "jsonArr": [
        {
          "key": "adviceDate",
          "value": this.marketLoanReceivedForm.value.fromDate ? this.datePipe.transform(this.marketLoanReceivedForm.value.fromDate, 'yyyy-MM-dd') : null
        }, {
          "key": "adviceDate",
          "value": this.marketLoanReceivedForm.value.toDate ? this.datePipe.transform(this.marketLoanReceivedForm.value.toDate, 'yyyy-MM-dd') : null
        }
      ]
  };  
      this._marketLoanService.fetchMarketLoanReceivedList(param).subscribe((res: any) => {
        if (res && res.result && res.status === 200) {
          this.element_data = [];
           const data = res && res.result ? res.result : null;
           const { size, totalElement, result, totalPage } = data;
          this.totalRecords = res['result'].totalElement;
          result.forEach(element => {
            this.element_data.push(getMarketListObject(element))
          });
          this.dataSource = new MatTableDataSource<any>(this.element_data);
          this.showTable = true;
        }
      }, error => {
        // Error
      });
    }else{      
      this.marketLoanReceivedForm.markAllAsTouched();
      this._toster.error('Please fill all mandatory fields.');
    }
  }

  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getDetails(this.pageIndex);
  }

  // Method to for setting data source attributes
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  addDetails(dpObj) {
    this._marketLoanService.setDPData(dpObj);
    this.router.navigate(['dashboard/dmo/market-loan-received/add-details']);
  }

  clearForm() {
    this.marketLoanReceivedForm.reset();
}
}
