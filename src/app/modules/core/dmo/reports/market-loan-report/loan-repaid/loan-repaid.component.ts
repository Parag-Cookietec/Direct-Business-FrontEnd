import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';
import { MarketLoanReportsService } from '../../reports-services/market-loan-reports.service';
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
    selector: 'app-loan-repaid',
    templateUrl: './loan-repaid.component.html',
    styleUrls: ['./loan-repaid.component.css']
})
export class LoanRepaidComponent implements OnInit {
    marketLoanRepaidForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    RateOfInterests; 
    LoanAmounts;

    FromYears;

    ToYears;

    dataSource;

    displayedColumns: any[] = ['financialYr', 'principalAmount', 'loanROI', 'totalAmount'];

    totalRecords: number = 10;
    pageSize: number = 10;
    pageIndex: number = 0;
    rateOfInterestID = null;
    loanAmountID = null;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dataService: DataService,
        private marketLoanReportsService: MarketLoanReportsService
    ) {}

    ngOnInit() {
        this.marketLoanRepaidForm = this.fb.group({
            loanNo: [''],
            fromDate: [''],
            toDate: [''],
            sanctionno: [''],
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

    inputChangeROI() {
        this.marketLoanRepaidForm.controls['loanROIEquals'].reset();
        this.marketLoanRepaidForm.controls['loanROIGreaterThan'].reset();
        this.marketLoanRepaidForm.controls['loanROILessThan'].reset();
        this.marketLoanRepaidForm.controls['loanROIBetweenFrom'].reset();
        this.marketLoanRepaidForm.controls['loanROIBetweenTo'].reset();
        this.rateOfInterestID = this.marketLoanRepaidForm.value.rateOfInterest;
    }

    inputChangeLoanAmount() {
        this.marketLoanRepaidForm.controls['loanAmountLessThan'].reset();
        this.marketLoanRepaidForm.controls['loanAmountGreaterThan'].reset();
        this.marketLoanRepaidForm.controls['loanAmountEquals'].reset();
        this.marketLoanRepaidForm.controls['loanAmountBetweenFrom'].reset();
        this.marketLoanRepaidForm.controls['loanAmountBetweenTo'].reset();
        console.log(this.marketLoanRepaidForm.value.loanAmount);
        this.loanAmountID = this.marketLoanRepaidForm.value.loanAmount;
    }
    reset() {
        this.marketLoanRepaidForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }

    getReports(offset = null) {
        const payload = {            
            fromDate: this.marketLoanRepaidForm.value.fromDate ? this.marketLoanRepaidForm.value.fromDate : "",
            toDate: this.marketLoanRepaidForm.value.toDate ? this.marketLoanRepaidForm.value.toDate : "",            
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,            
            loanROILessThan: this.marketLoanRepaidForm.value.loanROILessThan
                ? this.marketLoanRepaidForm.value.loanROILessThan
                : '',
            loanROIGreaterThan: this.marketLoanRepaidForm.value.loanROIGreaterThan
                ? this.marketLoanRepaidForm.value.loanROIGreaterThan
                : '',
            loanROIEquals: this.marketLoanRepaidForm.value.loanROIEquals
                ? this.marketLoanRepaidForm.value.loanROIEquals
                : '',
            loanROIBetweenFrom: this.marketLoanRepaidForm.value.loanROIBetweenFrom
                ? this.marketLoanRepaidForm.value.loanROIBetweenFrom
                : '',
            loanROIBetweenTo: this.marketLoanRepaidForm.value.loanROIBetweenTo
                ? this.marketLoanRepaidForm.value.loanROIBetweenTo
                : '',
            loanAmountLessThan: this.marketLoanRepaidForm.value.loanAmountLessThan
                ? this.marketLoanRepaidForm.value.loanAmountLessThan
                : '',
            loanAmountGreaterThan: this.marketLoanRepaidForm.value.loanAmountGreaterThan
                ? this.marketLoanRepaidForm.value.loanAmountGreaterThan
                : '',
            loanAmountEquals: this.marketLoanRepaidForm.value.loanAmountEquals
                ? this.marketLoanRepaidForm.value.loanAmountEquals
                : '',
            loanAmountBetweenFrom: this.marketLoanRepaidForm.value.loanAmountBetweenFrom
                ? this.marketLoanRepaidForm.value.loanAmountBetweenFrom
                : '',
            loanAmountBetweenTo: this.marketLoanRepaidForm.value.loanAmountBetweenTo
                ? this.marketLoanRepaidForm.value.loanAmountBetweenTo
                : '',

            amountIn: 'CRORE'
            // sanctionNo: this.marketLoanRepaidForm.value.sanctionno
        };

        this.marketLoanReportsService.getMarketLoanRePaidYearly(payload).subscribe(
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

    goToMonthwiseReport(id) {
        console.log(id);
        const yearId: any = {
            year_id: id
        };
        this.router.navigate(['/dashboard/dmo/reports/market-loan-reports/loan-repaid/month-wise'], {
            queryParams: { year_id: id }
        });
        // this.router.navigate([`/dashboard/dmo/reports/nssf-reports-Module/loan-repaid/year-wise/${id}`]);
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

    onPaginateChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        const dpObj = {
            pageIndex: event.pageIndex,
            pageElement: event.pageSize,
            jsonArr: []
        };
        let reqObj = {
            pageIndex: 0,
            pageElement: 10,
            jsonArr: []
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
