import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';
import { NssfReportsService } from '../../reports-services/nssf-reports.service';
interface RateOfInterest {
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
    nssfLoanRepaidForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    RateOfInterests; 

    LoanAmounts;

    FromYears;
    // : FromYear[] = [
    //     { value: '1', viewValue: '1998-1999' },
    //     { value: '2', viewValue: '1999-2000' },
    //     { value: '2', viewValue: '2000-2001' }
    // ];

    ToYears;

    // : ToYear[] = [
    //     { value: '1', viewValue: '1998-1999' },
    //     { value: '2', viewValue: '1999-2000' },
    //     { value: '2', viewValue: '2000-2001' }
    // ];

    dataSource;

    displayedColumns: any[] = ['financialYr', 'principalAmount', 'interestAmount', 'totalAmount'];

    totalRecords: number = 10;
    pageSize: number = 10;
    pageIndex: number = 0;
    rateOfInterestID = null;
    loanAmountID = null;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dataService: DataService,
        private nssfReportsService: NssfReportsService,
        private _nssfLoanService: NssfLoanService
    ) {}

    inputChangeROI() {
        this.nssfLoanRepaidForm.controls['loanROIEquals'].reset();
        this.nssfLoanRepaidForm.controls['loanROIGreaterThan'].reset();
        this.nssfLoanRepaidForm.controls['loanROILessThan'].reset();
        this.nssfLoanRepaidForm.controls['loanROIBetweenFrom'].reset();
        this.nssfLoanRepaidForm.controls['loanROIBetweenTo'].reset();
        this.rateOfInterestID = this.nssfLoanRepaidForm.value.rateOfInterest;
    }

    inputChangeLoanAmount() {
        this.nssfLoanRepaidForm.controls['loanAmountLessThan'].reset();
        this.nssfLoanRepaidForm.controls['loanAmountGreaterThan'].reset();
        this.nssfLoanRepaidForm.controls['loanAmountEquals'].reset();
        this.nssfLoanRepaidForm.controls['loanAmountBetweenFrom'].reset();
        this.nssfLoanRepaidForm.controls['loanAmountBetweenTo'].reset();
        console.log(this.nssfLoanRepaidForm.value.loanAmount);
        this.loanAmountID = this.nssfLoanRepaidForm.value.loanAmount;
    }
    reset() {
        this.nssfLoanRepaidForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }

    ngOnInit() {
        this.nssfLoanRepaidForm = this.fb.group({
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

    getReports(offset = null) {
        const payload = {
            fromDate: this.nssfLoanRepaidForm.value.fromDate ? this.nssfLoanRepaidForm.value.fromDate : "",
            toDate: this.nssfLoanRepaidForm.value.toDate ? this.nssfLoanRepaidForm.value.toDate : "",
            // fromDate: '2016-03-03',
            // toDate: '2021-03-03',
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,
            // loanROI: '',
            // loanAmount: ''
            loanROILessThan: this.nssfLoanRepaidForm.value.loanROILessThan
                ? this.nssfLoanRepaidForm.value.loanROILessThan
                : '',
            loanROIGreaterThan: this.nssfLoanRepaidForm.value.loanROIGreaterThan
                ? this.nssfLoanRepaidForm.value.loanROIGreaterThan
                : '',
            loanROIEquals: this.nssfLoanRepaidForm.value.loanROIEquals
                ? this.nssfLoanRepaidForm.value.loanROIEquals
                : '',
            loanROIBetweenFrom: this.nssfLoanRepaidForm.value.loanROIBetweenFrom
                ? this.nssfLoanRepaidForm.value.loanROIBetweenFrom
                : '',
            loanROIBetweenTo: this.nssfLoanRepaidForm.value.loanROIBetweenTo
                ? this.nssfLoanRepaidForm.value.loanROIBetweenTo
                : '',
            loanAmountLessThan: this.nssfLoanRepaidForm.value.loanAmountLessThan
                ? this.nssfLoanRepaidForm.value.loanAmountLessThan
                : '',
            loanAmountGreaterThan: this.nssfLoanRepaidForm.value.loanAmountGreaterThan
                ? this.nssfLoanRepaidForm.value.loanAmountGreaterThan
                : '',
            loanAmountEquals: this.nssfLoanRepaidForm.value.loanAmountEquals
                ? this.nssfLoanRepaidForm.value.loanAmountEquals
                : '',
            loanAmountBetweenFrom: this.nssfLoanRepaidForm.value.loanAmountBetweenFrom
                ? this.nssfLoanRepaidForm.value.loanAmountBetweenFrom
                : '',
            loanAmountBetweenTo: this.nssfLoanRepaidForm.value.loanAmountBetweenTo
                ? this.nssfLoanRepaidForm.value.loanAmountBetweenTo
                : '',

            amountIn: 'CRORE'
            // sanctionNo: this.nssfLoanRepaidForm.value.sanctionno
        };

        this.nssfReportsService.getNssfLoanRePaidYearly(payload).subscribe(
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

    goToMonthwiseReport(id) {
        console.log(id);
        const yearId: any = {
            year_id: id
        };
        this.router.navigate(['/dashboard/dmo/reports/nssf-reports-Module/loan-repaid/month-wise'], {
            queryParams: { year_id: id }
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
