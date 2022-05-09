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

@Component({
    selector: 'app-loan-receipt',
    templateUrl: './loan-receipt.component.html',
    styleUrls: ['./loan-receipt.component.css']
})
export class LoanReceiptComponent implements OnInit {
    marketLoanReceiptForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    RateOfInterests;
    LoanAmounts;

    dataSource;

    displayedColumns: any[] = [
        'srno',
        'loanDescription',
        'loanReceiptDt',
        'maturityDt',
        'loanTenure',
        'loanROI',
        'loanAmount'
    ];

    rateOfInterestID = null;
    loanAmountID = null;
    totalRecords: number = 10;
    pageSize: number = 50;
    pageIndex: number = 0;
    tableData = [];
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dataService: DataService,
        private marketLoanReportsService: MarketLoanReportsService
    ) {}

    ngOnInit() {
        this.marketLoanReceiptForm = this.fb.group({
            loanNo: [''],
            fromDate: [''],
            toDate: [''],
            loanTenure: [''],
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
            id: '664'
        };
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
        this.marketLoanReceiptForm.controls['loanROIEquals'].reset();
        this.marketLoanReceiptForm.controls['loanROIGreaterThan'].reset();
        this.marketLoanReceiptForm.controls['loanROILessThan'].reset();
        this.marketLoanReceiptForm.controls['loanROIBetweenFrom'].reset();
        this.marketLoanReceiptForm.controls['loanROIBetweenTo'].reset();
        this.rateOfInterestID = this.marketLoanReceiptForm.value.rateOfInterest;
    }

    inputChangeLoanAmount() {
        this.marketLoanReceiptForm.controls['loanAmountLessThan'].reset();
        this.marketLoanReceiptForm.controls['loanAmountGreaterThan'].reset();
        this.marketLoanReceiptForm.controls['loanAmountEquals'].reset();
        this.marketLoanReceiptForm.controls['loanAmountBetweenFrom'].reset();
        this.marketLoanReceiptForm.controls['loanAmountBetweenTo'].reset();
        console.log(this.marketLoanReceiptForm.value.loanAmount);
        this.loanAmountID = this.marketLoanReceiptForm.value.loanAmount;
    }
    reset() {
        this.marketLoanReceiptForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }

    getReports(offset = null) {
        const payload = {
            // fromDate: '2016-03-03',
            // toDate: '2021-03-03',
            
            loanDescription: 'test',
            fromDate: this.marketLoanReportsService.formatDate(this.marketLoanReceiptForm.value.fromDate),
            toDate: this.marketLoanReportsService.formatDate(this.marketLoanReceiptForm.value.toDate),
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,
            sanctionNo: this.marketLoanReceiptForm.value.sanctionno ? this.marketLoanReceiptForm.value.sanctionno : "",
            loanROILessThan: this.marketLoanReceiptForm.value.loanROILessThan
                ? this.marketLoanReceiptForm.value.loanROILessThan
                : '',
            loanROIGreaterThan: this.marketLoanReceiptForm.value.loanROIGreaterThan
                ? this.marketLoanReceiptForm.value.loanROIGreaterThan
                : '',
            loanROIEquals: this.marketLoanReceiptForm.value.loanROIEquals
                ? this.marketLoanReceiptForm.value.loanROIEquals
                : '',
            loanROIBetweenFrom: this.marketLoanReceiptForm.value.loanROIBetweenFrom
                ? this.marketLoanReceiptForm.value.loanROIBetweenFrom
                : '',
            loanROIBetweenTo: this.marketLoanReceiptForm.value.loanROIBetweenTo
                ? this.marketLoanReceiptForm.value.loanROIBetweenTo
                : '',
            loanAmountLessThan: this.marketLoanReceiptForm.value.loanAmountLessThan
                ? this.marketLoanReceiptForm.value.loanAmountLessThan
                : '',
            loanAmountGreaterThan: this.marketLoanReceiptForm.value.loanAmountGreaterThan
                ? this.marketLoanReceiptForm.value.loanAmountGreaterThan
                : '',
            loanAmountEquals: this.marketLoanReceiptForm.value.loanAmountEquals
                ? this.marketLoanReceiptForm.value.loanAmountEquals
                : '',
            loanAmountBetweenFrom: this.marketLoanReceiptForm.value.loanAmountBetweenFrom
                ? this.marketLoanReceiptForm.value.loanAmountBetweenFrom
                : '',
            loanAmountBetweenTo: this.marketLoanReceiptForm.value.loanAmountBetweenTo
                ? this.marketLoanReceiptForm.value.loanAmountBetweenTo
                : '',
            amountIn: 'CRORE',
            loanTenure: this.marketLoanReceiptForm.value.loanTenure ? this.marketLoanReceiptForm.value.loanTenure : ""
            // transactionDescription: 'test'
        };

        this.marketLoanReportsService.getMarketLoanReceipt(payload).subscribe(
            (response: any) => {
                
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

                // this.dataSource = new MatTableDataSource<any>(response?.result['1950-1951']);
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
