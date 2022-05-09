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
    nssfLoanRepaidYearWiseForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    RateOfInterests; 
    LoanAmounts;

    FromYears;

    ToYears;

    dataSource;

    displayedColumns: any[] = ['monthName', 'principalAmount', 'interestAmount', 'totalAmount'];

    totalRecords: number = 10;
    pageSize: number = 10;
    pageIndex: number = 0;
    yearID: any;
    rateOfInterestID = null;
    loanAmountID = null;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dataService: DataService,
        private nssfReportsService: NssfReportsService,
        public activatedRoute: ActivatedRoute,
        private _nssfLoanService: NssfLoanService
    ) {
        this.activatedRoute.queryParams.subscribe(res => {
            if (res && res?.year_id) {
                this.yearID = res.year_id;
            }
            console.log(this.yearID);
        });
    }

    ngOnInit() {
        this.nssfLoanRepaidYearWiseForm = this.fb.group({
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

    reset() {
        this.nssfLoanRepaidYearWiseForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }
    getReports(offset = null) {
        const payload = {
            
            fromDate: this.nssfLoanRepaidYearWiseForm.value.fromDate ? this.nssfLoanRepaidYearWiseForm.value.fromDate : "",
            toDate: this.nssfLoanRepaidYearWiseForm.value.toDate ? this.nssfLoanRepaidYearWiseForm.value.toDate : "",
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,
            // loanROI: '',
            // loanAmount: ''
            // sanctionNo: this.nssfLoanRepaidYearWiseForm.value.sanctionno
            financialYearId: this.yearID,
            loanROILessThan: this.nssfLoanRepaidYearWiseForm.value.loanROILessThan
                ? this.nssfLoanRepaidYearWiseForm.value.loanROILessThan
                : '',
            loanROIGreaterThan: this.nssfLoanRepaidYearWiseForm.value.loanROIGreaterThan
                ? this.nssfLoanRepaidYearWiseForm.value.loanROIGreaterThan
                : '',
            loanROIEquals: this.nssfLoanRepaidYearWiseForm.value.loanROIEquals
                ? this.nssfLoanRepaidYearWiseForm.value.loanROIEquals
                : '',
            loanROIBetweenFrom: this.nssfLoanRepaidYearWiseForm.value.loanROIBetweenFrom
                ? this.nssfLoanRepaidYearWiseForm.value.loanROIBetweenFrom
                : '',
            loanROIBetweenTo: this.nssfLoanRepaidYearWiseForm.value.loanROIBetweenTo
                ? this.nssfLoanRepaidYearWiseForm.value.loanROIBetweenTo
                : '',
            loanAmountLessThan: this.nssfLoanRepaidYearWiseForm.value.loanAmountLessThan
                ? this.nssfLoanRepaidYearWiseForm.value.loanAmountLessThan
                : '',
            loanAmountGreaterThan: this.nssfLoanRepaidYearWiseForm.value.loanAmountGreaterThan
                ? this.nssfLoanRepaidYearWiseForm.value.loanAmountGreaterThan
                : '',
            loanAmountEquals: this.nssfLoanRepaidYearWiseForm.value.loanAmountEquals
                ? this.nssfLoanRepaidYearWiseForm.value.loanAmountEquals
                : '',
            loanAmountBetweenFrom: this.nssfLoanRepaidYearWiseForm.value.loanAmountBetweenFrom
                ? this.nssfLoanRepaidYearWiseForm.value.loanAmountBetweenFrom
                : '',
            loanAmountBetweenTo: this.nssfLoanRepaidYearWiseForm.value.loanAmountBetweenTo
                ? this.nssfLoanRepaidYearWiseForm.value.loanAmountBetweenTo
                : ''
        };

        this.nssfReportsService.getNssfLoanRepaidMonthly(payload).subscribe(
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
        console.log('hiii');
        this.nssfLoanRepaidYearWiseForm.controls['loanROIEquals'].reset();
        this.nssfLoanRepaidYearWiseForm.controls['loanROIGreaterThan'].reset();
        this.nssfLoanRepaidYearWiseForm.controls['loanROILessThan'].reset();
        this.nssfLoanRepaidYearWiseForm.controls['loanROIBetweenFrom'].reset();
        this.nssfLoanRepaidYearWiseForm.controls['loanROIBetweenTo'].reset();
        this.rateOfInterestID = this.nssfLoanRepaidYearWiseForm.value.rateOfInterest;
    }

    inputChangeLoanAmount() {
        this.nssfLoanRepaidYearWiseForm.controls['loanAmountLessThan'].reset();
        this.nssfLoanRepaidYearWiseForm.controls['loanAmountGreaterThan'].reset();
        this.nssfLoanRepaidYearWiseForm.controls['loanAmountEquals'].reset();
        this.nssfLoanRepaidYearWiseForm.controls['loanAmountBetweenFrom'].reset();
        this.nssfLoanRepaidYearWiseForm.controls['loanAmountBetweenTo'].reset();
        this.loanAmountID = this.nssfLoanRepaidYearWiseForm.value.loanAmount;
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

    goToMonthwiseReport(year_id, month_id) {
        this.router.navigate(['/dashboard/dmo/reports/nssf-reports-Module/loan-repaid/date-wise'], {
            queryParams: { year_id: year_id, month_id: month_id }
        });
        // this.router.navigate([`/dashboard/dmo/reports/nssf-reports-Module/loan-repaid/year-wise/${id}`]);
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
