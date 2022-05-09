import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../../services/nssf-loan.service';
import * as moment from 'moment';
import { NssfReportsService } from '../../../reports-services/nssf-reports.service';
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
    selector: 'app-loan-repaid-month-wise',
    templateUrl: './loan-repaid-month-wise.component.html',
    styleUrls: ['./loan-repaid-month-wise.component.css']
})
export class LoanRepaidMonthWiseComponent implements OnInit {
    nssfLoanRepaidmonthwiseForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    RateOfInterests; 
    LoanAmounts;

    FromYears;

    ToYears;

    dataSource;

    rateOfInterestID = null;
    loanAmountID = null;
    displayedColumns: any[] = [
        'srno',
        'paymentDt',
        'sanctionNo',
        'loanAmount',
        'loanReceiptDt',
        'loanTenure',
        'loanROI',
        'principalAmount',
        'interestAmount',
        'totalAmount'
    ];

    totalRecords: number = 10;
    pageSize: number = 10;
    pageIndex: number = 0;
    monthID;
    yearID;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dataService: DataService,
        public activatedRoute: ActivatedRoute,
        private nssfReportsService: NssfReportsService,
        private _nssfLoanService: NssfLoanService
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
        this.nssfLoanRepaidmonthwiseForm = this.fb.group({
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
        this.nssfReportsService.getLessThan(payload).subscribe(
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
        this.nssfLoanRepaidmonthwiseForm.controls['loanROIEquals'].reset();
        this.nssfLoanRepaidmonthwiseForm.controls['loanROIGreaterThan'].reset();
        this.nssfLoanRepaidmonthwiseForm.controls['loanROILessThan'].reset();
        this.nssfLoanRepaidmonthwiseForm.controls['loanROIBetweenFrom'].reset();
        this.nssfLoanRepaidmonthwiseForm.controls['loanROIBetweenTo'].reset();
        this.rateOfInterestID = this.nssfLoanRepaidmonthwiseForm.value.rateOfInterest;
    }

    inputChangeLoanAmount() {
        this.nssfLoanRepaidmonthwiseForm.controls['loanAmountLessThan'].reset();
        this.nssfLoanRepaidmonthwiseForm.controls['loanAmountGreaterThan'].reset();
        this.nssfLoanRepaidmonthwiseForm.controls['loanAmountEquals'].reset();
        this.nssfLoanRepaidmonthwiseForm.controls['loanAmountBetweenFrom'].reset();
        this.nssfLoanRepaidmonthwiseForm.controls['loanAmountBetweenTo'].reset();
        console.log(this.nssfLoanRepaidmonthwiseForm.value.loanAmount);
        this.loanAmountID = this.nssfLoanRepaidmonthwiseForm.value.loanAmount;
    }

    getFromAndToYear() {
        this.nssfReportsService.getFinancialYears().subscribe(
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

    reset() {
        this.nssfLoanRepaidmonthwiseForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }
    getReports(offset = null) {
        const payload = {
            yearNo: this.yearID,
            monthNo: this.monthID,
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,
            fromDate: this.nssfLoanRepaidmonthwiseForm.value.fromDate ? this.nssfLoanRepaidmonthwiseForm.value.fromDate : "",
            toDate: this.nssfLoanRepaidmonthwiseForm.value.toDate ? this.nssfLoanRepaidmonthwiseForm.value.toDate : "",
            loanROILessThan: this.nssfLoanRepaidmonthwiseForm.value.loanROILessThan
                ? this.nssfLoanRepaidmonthwiseForm.value.loanROILessThan
                : '',
            loanROIGreaterThan: this.nssfLoanRepaidmonthwiseForm.value.loanROIGreaterThan
                ? this.nssfLoanRepaidmonthwiseForm.value.loanROIGreaterThan
                : '',
            loanROIEquals: this.nssfLoanRepaidmonthwiseForm.value.loanROIEquals
                ? this.nssfLoanRepaidmonthwiseForm.value.loanROIEquals
                : '',
            loanROIBetweenFrom: this.nssfLoanRepaidmonthwiseForm.value.loanROIBetweenFrom
                ? this.nssfLoanRepaidmonthwiseForm.value.loanROIBetweenFrom
                : '',
            loanROIBetweenTo: this.nssfLoanRepaidmonthwiseForm.value.loanROIBetweenTo
                ? this.nssfLoanRepaidmonthwiseForm.value.loanROIBetweenTo
                : '',
            loanAmountLessThan: this.nssfLoanRepaidmonthwiseForm.value.loanAmountLessThan
                ? this.nssfLoanRepaidmonthwiseForm.value.loanAmountLessThan
                : '',
            loanAmountGreaterThan: this.nssfLoanRepaidmonthwiseForm.value.loanAmountGreaterThan
                ? this.nssfLoanRepaidmonthwiseForm.value.loanAmountGreaterThan
                : '',
            loanAmountEquals: this.nssfLoanRepaidmonthwiseForm.value.loanAmountEquals
                ? this.nssfLoanRepaidmonthwiseForm.value.loanAmountEquals
                : '',
            loanAmountBetweenFrom: this.nssfLoanRepaidmonthwiseForm.value.loanAmountBetweenFrom
                ? this.nssfLoanRepaidmonthwiseForm.value.loanAmountBetweenFrom
                : '',
            loanAmountBetweenTo: this.nssfLoanRepaidmonthwiseForm.value.loanAmountBetweenTo
                ? this.nssfLoanRepaidmonthwiseForm.value.loanAmountBetweenTo
                : '',

            amountIn: 'CRORE'
        };

        this.nssfReportsService.getNssfLoanRepaidDatewise(payload).subscribe(
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
