import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MarketLoanService } from '../../services/market-loan.service';
import { ToastMsgService } from '../../services/toast.service';

@Component({
  selector: 'app-market-loan-repayment-rbi',
  templateUrl: './market-loan-repayment-rbi.component.html',
  styleUrls: ['./market-loan-repayment-rbi.component.css']
})
export class MarketLoanRepaymentRbiComponent implements OnInit {


  loanRepaymentForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  isDetails = false;

  // table data
  Element_Data: any[] = [];

  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'position',
    'memoNo',
    'adviceNo',
    'dpDate',
    'adviceDate',
    'adviceBy',
    'transactionDesc',
  ];

  constructor(private fb: FormBuilder, private router: Router
    , private toaster: ToastMsgService,
    private datePipe: DatePipe
    , private marketLoanService: MarketLoanService) { }

  ngOnInit() {
    this.loanRepaymentForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
    });
  }

  clearForm() {
    this.loanRepaymentForm.reset();
  }

  getDetails() {
    if (this.loanRepaymentForm.valid) {

      this.isDetails = true;
      var obj = {
        fromDate: this.loanRepaymentForm.value.fromDate ? this.datePipe.transform(this.loanRepaymentForm.value.fromDate, 'yyyy-MM-dd') : null,
        toDate: this.loanRepaymentForm.value.toDate ? this.datePipe.transform(this.loanRepaymentForm.value.toDate, 'yyyy-MM-dd') : null
      };
      this.marketLoanService.SearchForRepaymentByAdviceNo(obj).subscribe((res) => {
        if (res && res['status'] === 200 && res['result'] !== '') {
          this.Element_Data = res['result'].dmodpDataDtos;
          this.dataSource = new MatTableDataSource<any>(this.Element_Data);
        }
      },
        (err) => {
          this.toaster.error(err);
        });
    } else {
      this.loanRepaymentForm.markAllAsTouched;
    }
  }
}
