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
    nssfLoanoutstandingForm: FormGroup;
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

    

    dataSource;
    // = new MatTableDataSource<any>(this.Element_Data);

    displayedColumns: any[] = [
        'financialYr',
        'openingBalanceAmount',
        'newLoansRecieved',
        'loanRepaid',
        'closingAmount',
        'weightedAverageInterestRate'
    ];

    totalRecords;
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


    

    ngOnInit() {
        this.nssfLoanoutstandingForm = this.fb.group({
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

        this.getNssfloanoutstandingReports();
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
        this.nssfLoanoutstandingForm.controls['loanROIEquals'].reset();
        this.nssfLoanoutstandingForm.controls['loanROIGreaterThan'].reset();
        this.nssfLoanoutstandingForm.controls['loanROILessThan'].reset();
        this.nssfLoanoutstandingForm.controls['loanROIBetweenFrom'].reset();
        this.nssfLoanoutstandingForm.controls['loanROIBetweenTo'].reset();
        this.rateOfInterestID = this.nssfLoanoutstandingForm.value.rateOfInterest;
    }

    inputChangeLoanAmount() {
        this.nssfLoanoutstandingForm.controls['loanAmountLessThan'].reset();
        this.nssfLoanoutstandingForm.controls['loanAmountGreaterThan'].reset();
        this.nssfLoanoutstandingForm.controls['loanAmountEquals'].reset();
        this.nssfLoanoutstandingForm.controls['loanAmountBetweenFrom'].reset();
        this.nssfLoanoutstandingForm.controls['loanAmountBetweenTo'].reset();
        console.log(this.nssfLoanoutstandingForm.value.loanAmount);
        this.loanAmountID = this.nssfLoanoutstandingForm.value.loanAmount;
    }

    reset() {
        this.nssfLoanoutstandingForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }

    getFromAndToYear(){
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


    goToMonthwiseReport(id){     
        console.log(id)   
        const yearId : any = {
            year_id : id
        }
        this.router.navigate(['/dashboard/dmo/reports/nssf-reports-Module/loan-outstanding/month-wise'], { queryParams: { 'year_id': id  } });
        // this.router.navigate([`/dashboard/dmo/reports/nssf-reports-Module/loan-repaid/year-wise/${id}`]);
    }


    getNssfloanoutstandingReports(offset = null) {
        const payload = {
            fromDate: this.nssfLoanoutstandingForm.value.fromDate ? this.nssfLoanoutstandingForm.value.fromDate : "",
            toDate: this.nssfLoanoutstandingForm.value.toDate ? this.nssfLoanoutstandingForm.value.toDate : "",
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,                        
            loanROILessThan: this.nssfLoanoutstandingForm.value.loanROILessThan
                ? this.nssfLoanoutstandingForm.value.loanROILessThan
                : '',
            loanROIGreaterThan: this.nssfLoanoutstandingForm.value.loanROIGreaterThan
                ? this.nssfLoanoutstandingForm.value.loanROIGreaterThan
                : '',
            loanROIEquals: this.nssfLoanoutstandingForm.value.loanROIEquals
                ? this.nssfLoanoutstandingForm.value.loanROIEquals
                : '',
            loanROIBetweenFrom: this.nssfLoanoutstandingForm.value.loanROIBetweenFrom
                ? this.nssfLoanoutstandingForm.value.loanROIBetweenFrom
                : '',
            loanROIBetweenTo: this.nssfLoanoutstandingForm.value.loanROIBetweenTo
                ? this.nssfLoanoutstandingForm.value.loanROIBetweenTo
                : '',
            loanAmountLessThan: this.nssfLoanoutstandingForm.value.loanAmountLessThan
                ? this.nssfLoanoutstandingForm.value.loanAmountLessThan
                : '',
            loanAmountGreaterThan: this.nssfLoanoutstandingForm.value.loanAmountGreaterThan
                ? this.nssfLoanoutstandingForm.value.loanAmountGreaterThan
                : '',
            loanAmountEquals: this.nssfLoanoutstandingForm.value.loanAmountEquals
                ? this.nssfLoanoutstandingForm.value.loanAmountEquals
                : '',
            loanAmountBetweenFrom: this.nssfLoanoutstandingForm.value.loanAmountBetweenFrom
                ? this.nssfLoanoutstandingForm.value.loanAmountBetweenFrom
                : '',
            loanAmountBetweenTo: this.nssfLoanoutstandingForm.value.loanAmountBetweenTo
                ? this.nssfLoanoutstandingForm.value.loanAmountBetweenTo
                : '',

            amountIn: 'CRORE'
        };
    

        this.nssfReportsService.getNssfloanoutstanding(payload).subscribe(
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
        this.getNssfloanoutstandingReports(this.pageIndex);
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
