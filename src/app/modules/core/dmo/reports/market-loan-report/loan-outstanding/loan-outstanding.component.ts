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
    selector: 'loan-outstanding',
    templateUrl: './loan-outstanding.component.html',
    styleUrls: ['./loan-outstanding.component.css']
})
export class LoanoutstandingComponent implements OnInit {
    marketLoanoutstandingForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    RateOfInterests; 
    LoanAmounts;

    FromYears;

    ToYears;

    

    dataSource;

    displayedColumns: any[] = [
        'financialYr',
        'openingBalanceAmount',
        'newLoansRecieved',
        'loanRepaid',
        'closingAmount',
        'weightedAverageInterestRate'
    ];
    

    totalRecords: number = 10;
    pageSize: number = 100;
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
        this.loanAmountID = this.marketLoanoutstandingForm.value.loanAmount;
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

    goToMonthwiseReport(id) {
        console.log(id);
        const yearId: any = {
            year_id: id
        };
        this.router.navigate(['/dashboard/dmo/reports/market-loan-reports/loan-outstanding/month-wise'], {
            queryParams: { year_id: id }
        });
        // this.router.navigate([`/dashboard/dmo/reports/nssf-reports-Module/loan-repaid/year-wise/${id}`]);
    }
    reset() {
        this.marketLoanoutstandingForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }

    getReports(offset = null) {
        const payload = {                    
            // loanROIEquals: '',
            // loanAmountEquals: '',
            fromDate: this.marketLoanoutstandingForm.value.fromDate ? this.marketLoanoutstandingForm.value.fromDate : "",
            toDate: this.marketLoanoutstandingForm.value.toDate ? this.marketLoanoutstandingForm.value.toDate : "",
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,
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

        this.marketLoanReportsService.getMarketloanoutstanding(payload).subscribe(
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
