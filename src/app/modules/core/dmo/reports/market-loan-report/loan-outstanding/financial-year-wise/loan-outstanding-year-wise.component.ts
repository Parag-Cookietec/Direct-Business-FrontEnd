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
    selector: 'app-loan-outstanding-year-wise',
    templateUrl: './loan-outstanding-year-wise.component.html',
    styleUrls: ['./loan-outstanding-year-wise.component.css']
})
export class LoanoutstandingYearWiseComponent implements OnInit {
    marketLoanoutstandingForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    RateOfInterests; 
    LoanAmounts;

    FromYears;

    ToYears;

    rateOfInterestID = null;
    loanAmountID = null;

    dataSource;

    displayedColumns: any[] = [
        'monthName',
        'openingBalanceAmount',
        'newLoansRecieved',
        'loanRepaid',
        'closingAmount',
        'weightedAverageInterestRate'
    ];

  

    totalRecords: number = 10;
    pageSize: number = 10;
    pageIndex: number = 0;
    yearID;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        public activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private marketLoanReportsService: MarketLoanReportsService
    ) {
        this.activatedRoute.queryParams.subscribe(res => {
            if (res && res?.year_id) {
                this.yearID = res.year_id;
            }
            console.log(this.yearID);
        });
    }

    ngOnInit() {
        this.marketLoanoutstandingForm = this.fb.group({
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
        this.getReport();
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
        this.marketLoanoutstandingForm.controls['loanROIEquals'].reset();
        this.marketLoanoutstandingForm.controls['loanROIGreaterThan'].reset();
        this.marketLoanoutstandingForm.controls['loanROILessThan'].reset();
        this.marketLoanoutstandingForm.controls['loanROIBetweenFrom'].reset();
        this.marketLoanoutstandingForm.controls['loanROIBetweenTo'].reset();
        this.rateOfInterestID = this.marketLoanoutstandingForm.value.rateOfInterest;
    }

    inputChangeLoanAmount() {
        this.marketLoanoutstandingForm.controls['loanAmountLessThan'].reset();
        this.marketLoanoutstandingForm.controls['loanAmountGreaterThan'].reset();
        this.marketLoanoutstandingForm.controls['loanAmountEquals'].reset();
        this.marketLoanoutstandingForm.controls['loanAmountBetweenFrom'].reset();
        this.marketLoanoutstandingForm.controls['loanAmountBetweenTo'].reset();
        console.log(this.marketLoanoutstandingForm.value.loanAmount);
        this.loanAmountID = this.marketLoanoutstandingForm.value.loanAmount;
    }

    reset() {
        this.marketLoanoutstandingForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }

    goToMonthwiseReport(year_id, month_id) {
        this.router.navigate(['/dashboard/dmo/reports/market-loan-reports/loan-outstanding/date-wise'], {
            queryParams: { year_id: this.yearID, month_id: month_id }
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

    getReport(offset = null) {
        const payload = {
            fromDate: this.marketLoanoutstandingForm.value.fromDate  ? this.marketLoanoutstandingForm.value.fromDate : "",
            toDate: this.marketLoanoutstandingForm.value.toDate ? this.marketLoanoutstandingForm.value.toDate : "",
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,
            financialYearId: this.yearID,
            loanROILessThan: this.marketLoanoutstandingForm.value.loanROILessThan
                ? this.marketLoanoutstandingForm.value.loanROILessThan
                : '',
            loanROIGreaterThan: this.marketLoanoutstandingForm.value.loanROIGreaterThan
                ? this.marketLoanoutstandingForm.value.loanROIGreaterThan
                : '',
            loanROIEquals: this.marketLoanoutstandingForm.value.loanROIEquals
                ? this.marketLoanoutstandingForm.value.loanROIEquals
                : '',
            loanROIBetweenFrom: this.marketLoanoutstandingForm.value.loanROIBetweenFrom
                ? this.marketLoanoutstandingForm.value.loanROIBetweenFrom
                : '',
            loanROIBetweenTo: this.marketLoanoutstandingForm.value.loanROIBetweenTo
                ? this.marketLoanoutstandingForm.value.loanROIBetweenTo
                : '',
            loanAmountLessThan: this.marketLoanoutstandingForm.value.loanAmountLessThan
                ? this.marketLoanoutstandingForm.value.loanAmountLessThan
                : '',
            loanAmountGreaterThan: this.marketLoanoutstandingForm.value.loanAmountGreaterThan
                ? this.marketLoanoutstandingForm.value.loanAmountGreaterThan
                : '',
            loanAmountEquals: this.marketLoanoutstandingForm.value.loanAmountEquals
                ? this.marketLoanoutstandingForm.value.loanAmountEquals
                : '',
            loanAmountBetweenFrom: this.marketLoanoutstandingForm.value.loanAmountBetweenFrom
                ? this.marketLoanoutstandingForm.value.loanAmountBetweenFrom
                : '',
            loanAmountBetweenTo: this.marketLoanoutstandingForm.value.loanAmountBetweenTo
                ? this.marketLoanoutstandingForm.value.loanAmountBetweenTo
                : '',

            amountIn: 'CRORE'
        };

        this.marketLoanReportsService.getMarketloanoutstandingMonthly(payload).subscribe(
            (response: any) => {
                console.log(response);
                this.dataSource = new MatTableDataSource<any>(response?.result?.result);
                this.totalRecords = response?.result?.totalElement;
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
