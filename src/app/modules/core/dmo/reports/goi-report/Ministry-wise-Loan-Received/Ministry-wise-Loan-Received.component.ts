import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';
import { GoiLoanReportsService } from '../../reports-services/goi-loan-reports.service';
interface RateOfInterest {
    value: string;
    viewValue: string;
}
interface LoanAmount {
    value: string;
    viewValue: string;
}
interface FinancialYear {
    value: string;
    viewValue: string;
}
interface MinistryDeptName {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-Ministry-wise-Loan-Received',
    templateUrl: './Ministry-wise-Loan-Received.component.html',
    styleUrls: ['./Ministry-wise-Loan-Received.component.css']
})
export class MinistrywiseLoanReceivedComponent implements OnInit {
    goiMinistrywiseLoanReceivedForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    MinistryDeptNames;

    dataSource;
    tableData;
    RateOfInterests;
    LoanAmounts;
    FromYears;
    ToYears;
    rateOfInterestID = null;
    loanAmountID = null;

    displayedColumns: any[] = [
        'srno',
        'schemeName',
        'sanctionOrderNo',
        'loanStartDt',
        'loanTenure',
        'moratoriumPeriod',
        'loanAmount',
        'loanROI'
    ];

    totalRecords: number = 10;
    pageSize: number = 10;
    pageIndex: number = 0;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dataService: DataService,
        private goiLoanReportsService: GoiLoanReportsService
    ) {}

    ngOnInit() {
        this.goiMinistrywiseLoanReceivedForm = this.fb.group({
            loanNo: [''],
            fromDate: [''],
            toDate: [''],
            ammountIn: [''],
            ministryDeptName: [''],
            financialYearId: [''],
            loanTenure: [''],
            sanctionNo: [''],
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
        this.getMinstryDeptNames();
    }

    reset() {
        this.goiMinistrywiseLoanReceivedForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }
    getFromAndToYear() {
        this.goiLoanReportsService.getFinancialYears().subscribe(
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

    getMinstryDeptNames() {
        const payload = {
            pageIndex: '0',
            pageElement: '100',
            jsonArr: []
        };
        this.goiLoanReportsService.getMinstryDeptnames(payload).subscribe(
            (response: any) => {
                console.log(response);
                this.MinistryDeptNames = response?.['result']?.['result']
                // this.FromYears = response['result'];
                // this.ToYears = response['result'];
            },
            error => {
                console.log(error);
            }
        );
    }

    getLessGreaterThan() {
        const payload = {
            id: '664'
        };
        this.goiLoanReportsService.getLessThan(payload).subscribe(
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
        this.goiMinistrywiseLoanReceivedForm.controls['loanROIEquals'].reset();
        this.goiMinistrywiseLoanReceivedForm.controls['loanROIGreaterThan'].reset();
        this.goiMinistrywiseLoanReceivedForm.controls['loanROILessThan'].reset();
        this.goiMinistrywiseLoanReceivedForm.controls['loanROIBetweenFrom'].reset();
        this.goiMinistrywiseLoanReceivedForm.controls['loanROIBetweenTo'].reset();
        this.rateOfInterestID = this.goiMinistrywiseLoanReceivedForm.value.rateOfInterest;
    }

    inputChangeLoanAmount() {
        this.goiMinistrywiseLoanReceivedForm.controls['loanAmountLessThan'].reset();
        this.goiMinistrywiseLoanReceivedForm.controls['loanAmountGreaterThan'].reset();
        this.goiMinistrywiseLoanReceivedForm.controls['loanAmountEquals'].reset();
        this.goiMinistrywiseLoanReceivedForm.controls['loanAmountBetweenFrom'].reset();
        this.goiMinistrywiseLoanReceivedForm.controls['loanAmountBetweenTo'].reset();
        console.log(this.goiMinistrywiseLoanReceivedForm.value.loanAmount);
        this.loanAmountID = this.goiMinistrywiseLoanReceivedForm.value.loanAmount;
    }

    getReports(offset = null) {
        const payload = {
            // fromDate: '67',
            // toDate: '78',
            // loanROIEquals: '',
            // loanAmountEquals: '',
            fromDate: this.goiLoanReportsService.formatDate(this.goiMinistrywiseLoanReceivedForm.value.fromDate),
            toDate: this.goiLoanReportsService.formatDate(this.goiMinistrywiseLoanReceivedForm.value.toDate),
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,
            ministryName: this.goiMinistrywiseLoanReceivedForm.value.ministryDeptName ? this.goiMinistrywiseLoanReceivedForm.value.ministryDeptName : "",
            financialYr: this.goiMinistrywiseLoanReceivedForm.value.financialYearId ? this.goiMinistrywiseLoanReceivedForm.value.financialYearId : "",
            loanTenure: this.goiMinistrywiseLoanReceivedForm.value.loanTenure ? this.goiMinistrywiseLoanReceivedForm.value.loanTenure : "",
            sanctionNo: this.goiMinistrywiseLoanReceivedForm.value.sanctionno,
            loanROILessThan: this.goiMinistrywiseLoanReceivedForm.value.loanROILessThan
                ? this.goiMinistrywiseLoanReceivedForm.value.loanROILessThan
                : '',
            loanROIGreaterThan: this.goiMinistrywiseLoanReceivedForm.value.loanROIGreaterThan
                ? this.goiMinistrywiseLoanReceivedForm.value.loanROIGreaterThan
                : '',
            loanROIEquals: this.goiMinistrywiseLoanReceivedForm.value.loanROIEquals
                ? this.goiMinistrywiseLoanReceivedForm.value.loanROIEquals
                : '',
            loanROIBetweenFrom: this.goiMinistrywiseLoanReceivedForm.value.loanROIBetweenFrom
                ? this.goiMinistrywiseLoanReceivedForm.value.loanROIBetweenFrom
                : '',
            loanROIBetweenTo: this.goiMinistrywiseLoanReceivedForm.value.loanROIBetweenTo
                ? this.goiMinistrywiseLoanReceivedForm.value.loanROIBetweenTo
                : '',
            loanAmountLessThan: this.goiMinistrywiseLoanReceivedForm.value.loanAmountLessThan
                ? this.goiMinistrywiseLoanReceivedForm.value.loanAmountLessThan
                : '',
            loanAmountGreaterThan: this.goiMinistrywiseLoanReceivedForm.value.loanAmountGreaterThan
                ? this.goiMinistrywiseLoanReceivedForm.value.loanAmountGreaterThan
                : '',
            loanAmountEquals: this.goiMinistrywiseLoanReceivedForm.value.loanAmountEquals
                ? this.goiMinistrywiseLoanReceivedForm.value.loanAmountEquals
                : '',
            loanAmountBetweenFrom: this.goiMinistrywiseLoanReceivedForm.value.loanAmountBetweenFrom
                ? this.goiMinistrywiseLoanReceivedForm.value.loanAmountBetweenFrom
                : '',
            loanAmountBetweenTo: this.goiMinistrywiseLoanReceivedForm.value.loanAmountBetweenTo
                ? this.goiMinistrywiseLoanReceivedForm.value.loanAmountBetweenTo
                : '',

            // amountIn: 'CRORE'
        };

        this.goiLoanReportsService.getGOIministrywiseloanReceived(payload).subscribe(
            (response: any) => {
                console.log(response);

                const tablerows = [];                                
                Object.keys(response?.result).map(function(key, index) {
                    // console.log(response?.result[key]);
                    //   console.log(index)                      
                    if(response?.result[key]){
                        tablerows.push(response?.result[key])
                    }
                  });
                  console.log(tablerows)
                  this.tableData = []
                  this.tableData = tablerows;
                  console.log(this.tableData)
                // this.dataSource = new MatTableDataSource<any>(response?.result?.result);
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
