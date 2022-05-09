import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MarketLoanRepaymentSchedule } from '../../../model/dmo';
import { Router } from '@angular/router';
import { MarketLoanService } from '../../../services/market-loan.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-market-loan-repayment-schedule',
  templateUrl: './market-loan-repayment-schedule.component.html',
  styleUrls: ['./market-loan-repayment-schedule.component.css']
})
export class MarketLoanRepaymentScheduleComponent implements OnInit {

  dataObj: any;
  // Table data for Loan Repayment Schedule Table
  Element_Data: MarketLoanRepaymentSchedule[] = [];

  // Table Columns for Loan Repayment Schedule Table
  displayedColumns: any[] = [
    'position',
    'financialYr',
    'installDueDt',
    'openingBalAmt',
    'principalAmount',
    // 'interest',
    'closingBalAmt'
  ];

  // Initialize variables and form
  marketLoanRepaymentScheduleForm: FormGroup;
  todayDate = Date.now();
  dataSource = new MatTableDataSource<MarketLoanRepaymentSchedule>(this.Element_Data);
  adviceNo;// = '21825';

  // Initialize Paginator
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  directiveObj = new CommonDirective();
  constructor(private fb: FormBuilder
    , private _marketLoanService: MarketLoanService
    , private toaster: ToastrService
    , private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.adviceNo = navigation.extras;
  }

  // Initialize Form Fields
  ngOnInit() {
    this.marketLoanRepaymentScheduleForm = this.fb.group({
      sanctionDate: [{ value: '', disabled: true }],
      loanStartDate: [{ value: '', disabled: true }],
      loanAmount: [{ value: '', disabled: true }],
      interestRate: [{ value: '', disabled: true }],
      loanTenure: [{ value: '', disabled: true }],
      moratoriumPeriod: [{ value: '', disabled: true }],
    });
    this.GetAllRepaymentByAdviceNo(this.adviceNo);
  }


  // Method to for setting data source attributes
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSubmit() {
    this.router.navigate(['dashboard/dmo/market-loan-received']);
  }

  GetAllRepaymentByAdviceNo(adviceNo) {
    this._marketLoanService.GetAllRepaymentByAdviceNo(adviceNo).subscribe((res) => {
      if (res && res['status'] === 200 && res['result'] !== '') {
        this.dataObj = res['result'];
        this.dataSource = new MatTableDataSource<any>(this.dataObj.dtos);
        this.marketLoanRepaymentScheduleForm.get('sanctionDate').patchValue(this.dataObj.sanctionOrderDt);
        this.marketLoanRepaymentScheduleForm.get('loanStartDate').patchValue(this.dataObj.loanStartDt);
        this.marketLoanRepaymentScheduleForm.get('loanAmount').patchValue(this.dataObj.loanAmount);
        this.marketLoanRepaymentScheduleForm.get('interestRate').patchValue(this.dataObj.loanRoi);
        this.marketLoanRepaymentScheduleForm.get('loanTenure').patchValue(this.dataObj.loanTenure);
        this.marketLoanRepaymentScheduleForm.get('moratoriumPeriod').patchValue(this.dataObj.moratoriumPeriod);
      }
    },
      (err) => {
        this.toaster.error(err);
      });
  }
}