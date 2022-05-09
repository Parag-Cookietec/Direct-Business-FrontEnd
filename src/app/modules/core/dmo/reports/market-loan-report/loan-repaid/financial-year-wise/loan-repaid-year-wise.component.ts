import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../../services/nssf-loan.service';
import * as moment from 'moment';
import { MarketLoanReportsService } from '../../../reports-services/market-loan-reports.service';
interface RateOfInterest {
  value: string;
  viewValue: string;
}
interface LoanAmount {
  value: string;
  viewValue: string;
}
interface LoanAmount {
  value: string;
  viewValue: string;
}
interface FromYear {
  value: string;
  viewValue: string;
}
interface ToYear {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-loan-repaid-year-wise',
  templateUrl: './loan-repaid-year-wise.component.html',
  styleUrls: ['./loan-repaid-year-wise.component.css']
})
export class LoanRepaidYearWiseComponent implements OnInit {

  marketLoanRepaidYearWiseForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();


  RateOfInterests; 
  LoanAmounts;

FromYears;

ToYears;

dataSource;
yearID: any;
    rateOfInterestID = null;
    loanAmountID = null;



  displayedColumns: any[] = ['monthName', 'principalAmount', 'interestAmount', 'totalAmount'];
   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    ,private marketLoanReportsService: MarketLoanReportsService
    ,public activatedRoute: ActivatedRoute) { 

      this.activatedRoute.queryParams.subscribe(res => {
        if (res && res?.year_id) {
            this.yearID = res.year_id;
        }
        console.log(this.yearID);
    });
    }

  ngOnInit() {
    this.marketLoanRepaidYearWiseForm = this.fb.group({
      loanNo: [''],
      fromDate: [''],
      toDate: [''],
      ammountIn: [''],
            rateOfInterest: [''],
            loanROILessThan: [''],
            loanROIGreaterThan: [''],
            loanROIEquals: [''],
            loanROIBetweenFrom: [''],
            loanROIBetweenTo: [''],
            loanAmount: [''],
            loanAmountLessThan: [''],
            loanAmountGreaterThan: [''],
            loanAmountEquals: [''],
            loanAmountBetweenFrom: [''],
            loanAmountBetweenTo: ['']
    });
    this.getReports();
        this.getFromAndToYear();
        this.getLessGreaterThan();
      }
  
      getLessGreaterThan() {
          const payload = {
              "id" : "664"
          }
          this.marketLoanReportsService.getLessThan(payload).subscribe(
              (response: any) => {
                  console.log(response);
                  this.RateOfInterests = response['result'];
                  this.LoanAmounts = response['result'];
              },
              error => {
                  console.log(error);
              }
          );
      }

  reset() {
    this.marketLoanRepaidYearWiseForm.reset();
    this.loanAmountID = null;
    this.rateOfInterestID = null;
}
getReports(offset = null) {
    const payload = {
        // fromDate: this.nssfReportsService.formatDate(this.marketLoanRepaidYearWiseForm.value.fromDate),
        // toDate: this.nssfReportsService.formatDate(this.marketLoanRepaidYearWiseForm.value.toDate),
        // fromDate: '2016-03-03',
        // toDate: '2021-03-03',
        fromDate: this.marketLoanRepaidYearWiseForm.value.fromDate ? this.marketLoanRepaidYearWiseForm.value.fromDate : "",
        toDate: this.marketLoanRepaidYearWiseForm.value.toDate ? this.marketLoanRepaidYearWiseForm.value.toDate : "",
        pageIndex: offset ? offset : this.pageIndex,
        pageSize: this.pageSize,
        // loanROI: '',
        // loanAmount: ''
        // sanctionNo: this.marketLoanRepaidYearWiseForm.value.sanctionno
        financialYearId: this.yearID,
        loanROILessThan: this.marketLoanRepaidYearWiseForm.value.loanROILessThan
            ? this.marketLoanRepaidYearWiseForm.value.loanROILessThan
            : '',
        loanROIGreaterThan: this.marketLoanRepaidYearWiseForm.value.loanROIGreaterThan
            ? this.marketLoanRepaidYearWiseForm.value.loanROIGreaterThan
            : '',
        loanROIEquals: this.marketLoanRepaidYearWiseForm.value.loanROIEquals
            ? this.marketLoanRepaidYearWiseForm.value.loanROIEquals
            : '',
        loanROIBetweenFrom: this.marketLoanRepaidYearWiseForm.value.loanROIBetweenFrom
            ? this.marketLoanRepaidYearWiseForm.value.loanROIBetweenFrom
            : '',
        loanROIBetweenTo: this.marketLoanRepaidYearWiseForm.value.loanROIBetweenTo
            ? this.marketLoanRepaidYearWiseForm.value.loanROIBetweenTo
            : '',
        loanAmountLessThan: this.marketLoanRepaidYearWiseForm.value.loanAmountLessThan
            ? this.marketLoanRepaidYearWiseForm.value.loanAmountLessThan
            : '',
        loanAmountGreaterThan: this.marketLoanRepaidYearWiseForm.value.loanAmountGreaterThan
            ? this.marketLoanRepaidYearWiseForm.value.loanAmountGreaterThan
            : '',
        loanAmountEquals: this.marketLoanRepaidYearWiseForm.value.loanAmountEquals
            ? this.marketLoanRepaidYearWiseForm.value.loanAmountEquals
            : '',
        loanAmountBetweenFrom: this.marketLoanRepaidYearWiseForm.value.loanAmountBetweenFrom
            ? this.marketLoanRepaidYearWiseForm.value.loanAmountBetweenFrom
            : '',
        loanAmountBetweenTo: this.marketLoanRepaidYearWiseForm.value.loanAmountBetweenTo
            ? this.marketLoanRepaidYearWiseForm.value.loanAmountBetweenTo
            : ''
    };

    this.marketLoanReportsService.getMarketLoanRepaidMonthly(payload).subscribe(
        (response: any) => {
            console.log(response);
            this.dataSource = new MatTableDataSource<any>(response?.result);
            this.totalRecords = response?.result?.totalElement;
        },
        error => {
            console.log(error);
        }
    );
}

inputChangeROI() {    
    this.marketLoanRepaidYearWiseForm.controls['loanROIEquals'].reset();
    this.marketLoanRepaidYearWiseForm.controls['loanROIGreaterThan'].reset();
    this.marketLoanRepaidYearWiseForm.controls['loanROILessThan'].reset();
    this.marketLoanRepaidYearWiseForm.controls['loanROIBetweenFrom'].reset();
    this.marketLoanRepaidYearWiseForm.controls['loanROIBetweenTo'].reset();
    this.rateOfInterestID = this.marketLoanRepaidYearWiseForm.value.rateOfInterest;
}

inputChangeLoanAmount() {
    this.marketLoanRepaidYearWiseForm.controls['loanAmountLessThan'].reset();
    this.marketLoanRepaidYearWiseForm.controls['loanAmountGreaterThan'].reset();
    this.marketLoanRepaidYearWiseForm.controls['loanAmountEquals'].reset();
    this.marketLoanRepaidYearWiseForm.controls['loanAmountBetweenFrom'].reset();
    this.marketLoanRepaidYearWiseForm.controls['loanAmountBetweenTo'].reset();
    this.loanAmountID = this.marketLoanRepaidYearWiseForm.value.loanAmount;
}
getFromAndToYear() {
    this.marketLoanReportsService.getFinancialYears().subscribe(
        (response: any) => {
            console.log(response);
            this.FromYears = response['result'];
            this.ToYears = response['result'];
        },
        error => {
            console.log(error);
        }
    );
}

goToMonthwiseReport(year_id, month_id) {
  this.router.navigate(['/dashboard/dmo/reports/market-loan-reports/loan-repaid/date-wise'], {
      queryParams: { year_id: this.yearID, month_id: month_id }
  });
  // this.router.navigate([`/dashboard/dmo/reports/nssf-reports-Module/loan-repaid/year-wise/${id}`]);
}
 
  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const dpObj = {
      "pageIndex": event.pageIndex,
      "pageElement": event.pageSize,
      "jsonArr": []
    };
    let reqObj = {
      "pageIndex": 0,
      "pageElement": 10,
      "jsonArr": []
    };
  }

/*   onSubmit() { }

  onApprove(obj) {
    this._nssfLoanService.setLoanId(obj.id);
    this.router.navigate(['/dashboard/dmo/nssf-loan-approved/approve']);
  }

  onEdit(id) {
    this.dataService.setOption('fromApproved', 'editMode');
    this.router.navigate([`/dashboard/dmo/nssf-loan-received/add-details/${id}`]);
  }

  onView(id) {
    this.dataService.setOption('fromApproved', 'viewMode');
    this.router.navigate([`/dashboard/dmo/nssf-loan-received/add-details/${id}`]);

  } */
}
