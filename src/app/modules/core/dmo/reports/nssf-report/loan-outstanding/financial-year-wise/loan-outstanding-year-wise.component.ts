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
    selector: 'app-loan-outstanding-year-wise',
    templateUrl: './loan-outstanding-year-wise.component.html',
    styleUrls: ['./loan-outstanding-year-wise.component.css']
})
export class LoanoutstandingYearWiseComponent implements OnInit {
    nssfLoanoutstandingYearWiseForm: FormGroup;
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
    //  = new MatTableDataSource<any>(this.Element_Data);

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
        private dataService: DataService,
        public activatedRoute: ActivatedRoute,
        private nssfReportsService: NssfReportsService,
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
        this.nssfLoanoutstandingYearWiseForm = this.fb.group({
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
        this.nssfLoanoutstandingYearWiseForm.controls['loanROIEquals'].reset();
        this.nssfLoanoutstandingYearWiseForm.controls['loanROIGreaterThan'].reset();
        this.nssfLoanoutstandingYearWiseForm.controls['loanROILessThan'].reset();
        this.nssfLoanoutstandingYearWiseForm.controls['loanROIBetweenFrom'].reset();
        this.nssfLoanoutstandingYearWiseForm.controls['loanROIBetweenTo'].reset();
        this.rateOfInterestID = this.nssfLoanoutstandingYearWiseForm.value.rateOfInterest;
    }

    inputChangeLoanAmount() {
        this.nssfLoanoutstandingYearWiseForm.controls['loanAmountLessThan'].reset();
        this.nssfLoanoutstandingYearWiseForm.controls['loanAmountGreaterThan'].reset();
        this.nssfLoanoutstandingYearWiseForm.controls['loanAmountEquals'].reset();
        this.nssfLoanoutstandingYearWiseForm.controls['loanAmountBetweenFrom'].reset();
        this.nssfLoanoutstandingYearWiseForm.controls['loanAmountBetweenTo'].reset();
        console.log(this.nssfLoanoutstandingYearWiseForm.value.loanAmount);
        this.loanAmountID = this.nssfLoanoutstandingYearWiseForm.value.loanAmount;
    }

    reset() {
        this.nssfLoanoutstandingYearWiseForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }

    goToMonthwiseReport(year_id, month_id) {
        this.router.navigate(['/dashboard/dmo/reports/nssf-reports-Module/loan-outstanding/date-wise'], {
            queryParams: { year_id: this.yearID, month_id: month_id }
        });
        // this.router.navigate([`/dashboard/dmo/reports/nssf-reports-Module/loan-repaid/year-wise/${id}`]);
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

    getReport(offset = null) {
        const payload = {
            fromDate: this.nssfLoanoutstandingYearWiseForm.value.fromDate ? this.nssfLoanoutstandingYearWiseForm.value.fromDate : "",
            toDate: this.nssfLoanoutstandingYearWiseForm.value.toDate ? this.nssfLoanoutstandingYearWiseForm.value.toDate : "",
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,
            financialYearId: this.yearID,
            loanROILessThan: this.nssfLoanoutstandingYearWiseForm.value.loanROILessThan
                ? this.nssfLoanoutstandingYearWiseForm.value.loanROILessThan
                : '',
            loanROIGreaterThan: this.nssfLoanoutstandingYearWiseForm.value.loanROIGreaterThan
                ? this.nssfLoanoutstandingYearWiseForm.value.loanROIGreaterThan
                : '',
            loanROIEquals: this.nssfLoanoutstandingYearWiseForm.value.loanROIEquals
                ? this.nssfLoanoutstandingYearWiseForm.value.loanROIEquals
                : '',
            loanROIBetweenFrom: this.nssfLoanoutstandingYearWiseForm.value.loanROIBetweenFrom
                ? this.nssfLoanoutstandingYearWiseForm.value.loanROIBetweenFrom
                : '',
            loanROIBetweenTo: this.nssfLoanoutstandingYearWiseForm.value.loanROIBetweenTo
                ? this.nssfLoanoutstandingYearWiseForm.value.loanROIBetweenTo
                : '',
            loanAmountLessThan: this.nssfLoanoutstandingYearWiseForm.value.loanAmountLessThan
                ? this.nssfLoanoutstandingYearWiseForm.value.loanAmountLessThan
                : '',
            loanAmountGreaterThan: this.nssfLoanoutstandingYearWiseForm.value.loanAmountGreaterThan
                ? this.nssfLoanoutstandingYearWiseForm.value.loanAmountGreaterThan
                : '',
            loanAmountEquals: this.nssfLoanoutstandingYearWiseForm.value.loanAmountEquals
                ? this.nssfLoanoutstandingYearWiseForm.value.loanAmountEquals
                : '',
            loanAmountBetweenFrom: this.nssfLoanoutstandingYearWiseForm.value.loanAmountBetweenFrom
                ? this.nssfLoanoutstandingYearWiseForm.value.loanAmountBetweenFrom
                : '',
            loanAmountBetweenTo: this.nssfLoanoutstandingYearWiseForm.value.loanAmountBetweenTo
                ? this.nssfLoanoutstandingYearWiseForm.value.loanAmountBetweenTo
                : '',

            amountIn: 'CRORE'
            
        };

        this.nssfReportsService.getNssfloanoutstandingMonthly(payload).subscribe(
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
