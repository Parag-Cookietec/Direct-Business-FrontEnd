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

interface FromYear {
    value: string;
    viewValue: string;
}
interface ToYear {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-loan-outstanding-month-wise',
    templateUrl: './loan-outstanding-month-wise.component.html',
    styleUrls: ['./loan-outstanding-month-wise.component.css']
})
export class LoanoutstandingMonthWiseComponent implements OnInit {
    nssfLoanoutstandingmonthwiseForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    RateOfInterests; 
    LoanAmounts;


    FromYears;

    ToYears;

    rateOfInterestID = null;
    loanAmountID = null;
    monthID;
    yearID;

    dataSource;

    displayedColumns: any[] = [
        'srno',
        'loanReceiptDate',
        'loanDescription',
        'loanTenure',
        'moratorium',
        'interestRate',
        'loanAmount'
    ];

    totalRecords: number = 10;
    pageSize: number = 10;
    pageIndex: number = 0;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private marketLoanReportsService: MarketLoanReportsService
    ) {
        this.activatedRoute.queryParams.subscribe(res => {
            if (res && res?.month_id) {
                this.monthID = res.month_id;
            }

            if (res && res?.year_id) {
                this.yearID = res.year_id;
            }
            console.log(this.monthID);
        });
    }

    ngOnInit() {
        this.nssfLoanoutstandingmonthwiseForm = this.fb.group({
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


    reset() {
        this.nssfLoanoutstandingmonthwiseForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }

    inputChangeROI() {
        this.nssfLoanoutstandingmonthwiseForm.controls['loanROIEquals'].reset();
        this.nssfLoanoutstandingmonthwiseForm.controls['loanROIGreaterThan'].reset();
        this.nssfLoanoutstandingmonthwiseForm.controls['loanROILessThan'].reset();
        this.nssfLoanoutstandingmonthwiseForm.controls['loanROIBetweenFrom'].reset();
        this.nssfLoanoutstandingmonthwiseForm.controls['loanROIBetweenTo'].reset();
        this.rateOfInterestID = this.nssfLoanoutstandingmonthwiseForm.value.rateOfInterest;
    }

    inputChangeLoanAmount() {
        this.nssfLoanoutstandingmonthwiseForm.controls['loanAmountLessThan'].reset();
        this.nssfLoanoutstandingmonthwiseForm.controls['loanAmountGreaterThan'].reset();
        this.nssfLoanoutstandingmonthwiseForm.controls['loanAmountEquals'].reset();
        this.nssfLoanoutstandingmonthwiseForm.controls['loanAmountBetweenFrom'].reset();
        this.nssfLoanoutstandingmonthwiseForm.controls['loanAmountBetweenTo'].reset();
        console.log(this.nssfLoanoutstandingmonthwiseForm.value.loanAmount);
        this.loanAmountID = this.nssfLoanoutstandingmonthwiseForm.value.loanAmount;
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
            
            // loanROIEquals: '',
            // loanAmountEquals: '',
            fromDate: this.nssfLoanoutstandingmonthwiseForm.value.fromDate,
            toDate: this.nssfLoanoutstandingmonthwiseForm.value.toDate,
            financialYearId: this.yearID,
            monthNo: this.monthID,
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,
            loanROILessThan: this.nssfLoanoutstandingmonthwiseForm.value.loanROILessThan
                ? this.nssfLoanoutstandingmonthwiseForm.value.loanROILessThan
                : '',
            loanROIGreaterThan: this.nssfLoanoutstandingmonthwiseForm.value.loanROIGreaterThan
                ? this.nssfLoanoutstandingmonthwiseForm.value.loanROIGreaterThan
                : '',
            loanROIEquals: this.nssfLoanoutstandingmonthwiseForm.value.loanROIEquals
                ? this.nssfLoanoutstandingmonthwiseForm.value.loanROIEquals
                : '',
            loanROIBetweenFrom: this.nssfLoanoutstandingmonthwiseForm.value.loanROIBetweenFrom
                ? this.nssfLoanoutstandingmonthwiseForm.value.loanROIBetweenFrom
                : '',
            loanROIBetweenTo: this.nssfLoanoutstandingmonthwiseForm.value.loanROIBetweenTo
                ? this.nssfLoanoutstandingmonthwiseForm.value.loanROIBetweenTo
                : '',
            loanAmountLessThan: this.nssfLoanoutstandingmonthwiseForm.value.loanAmountLessThan
                ? this.nssfLoanoutstandingmonthwiseForm.value.loanAmountLessThan
                : '',
            loanAmountGreaterThan: this.nssfLoanoutstandingmonthwiseForm.value.loanAmountGreaterThan
                ? this.nssfLoanoutstandingmonthwiseForm.value.loanAmountGreaterThan
                : '',
            loanAmountEquals: this.nssfLoanoutstandingmonthwiseForm.value.loanAmountEquals
                ? this.nssfLoanoutstandingmonthwiseForm.value.loanAmountEquals
                : '',
            loanAmountBetweenFrom: this.nssfLoanoutstandingmonthwiseForm.value.loanAmountBetweenFrom
                ? this.nssfLoanoutstandingmonthwiseForm.value.loanAmountBetweenFrom
                : '',
            loanAmountBetweenTo: this.nssfLoanoutstandingmonthwiseForm.value.loanAmountBetweenTo
                ? this.nssfLoanoutstandingmonthwiseForm.value.loanAmountBetweenTo
                : '',

            amountIn: 'CRORE'
        };

        this.marketLoanReportsService.getMarketloanoutstandingDateWise(payload).subscribe(
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
