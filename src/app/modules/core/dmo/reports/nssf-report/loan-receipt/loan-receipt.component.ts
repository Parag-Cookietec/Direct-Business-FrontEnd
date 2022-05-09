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

@Component({
    selector: 'app-loan-receipt',
    templateUrl: './loan-receipt.component.html',
    styleUrls: ['./loan-receipt.component.css']
})
export class LoanReceiptComponent implements OnInit {
    nssfLoanReceiptForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    directiveObj = new CommonDirective();

    RateOfInterests; 
    LoanAmounts;



    dataSource;
    tableData = [];
    
    displayedColumns: any[] = [
        'srno',
        'sanctionNo',
        'loanStartDt',
        'loanTenure',
        'moratoriumPeriod',
        'loanROI',
        'loanAmount'
    ];

    totalRecords: number = 10;
    pageSize: number = 50;
    pageIndex: number = 0;
    rateOfInterestID = null;
    loanAmountID = null;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private nssfReportsService: NssfReportsService,
        private dataService: DataService,
        private _nssfLoanService: NssfLoanService
    ) {}

    ngOnInit() {
        this.nssfLoanReceiptForm = this.fb.group({
            fromDate: [''],
            toDate: [''],
            sanctionno: [''],
            loanTenure: [''],
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

    inputChangeROI() {
        this.nssfLoanReceiptForm.controls['loanROIEquals'].reset();
        this.nssfLoanReceiptForm.controls['loanROIGreaterThan'].reset();
        this.nssfLoanReceiptForm.controls['loanROILessThan'].reset();
        this.nssfLoanReceiptForm.controls['loanROIBetweenFrom'].reset();
        this.nssfLoanReceiptForm.controls['loanROIBetweenTo'].reset();
        this.rateOfInterestID = this.nssfLoanReceiptForm.value.rateOfInterest;
    }

    inputChangeLoanAmount() {
        this.nssfLoanReceiptForm.controls['loanAmountLessThan'].reset();
        this.nssfLoanReceiptForm.controls['loanAmountGreaterThan'].reset();
        this.nssfLoanReceiptForm.controls['loanAmountEquals'].reset();
        this.nssfLoanReceiptForm.controls['loanAmountBetweenFrom'].reset();
        this.nssfLoanReceiptForm.controls['loanAmountBetweenTo'].reset();
        console.log(this.nssfLoanReceiptForm.value.loanAmount);
        this.loanAmountID = this.nssfLoanReceiptForm.value.loanAmount;
    }
    reset() {
        this.nssfLoanReceiptForm.reset();
        this.loanAmountID = null;
        this.rateOfInterestID = null;
    }

    getReports(offset = null) {
        const payload = {
            fromDate: this.nssfReportsService.formatDate(this.nssfLoanReceiptForm.value.fromDate),
            toDate: this.nssfReportsService.formatDate(this.nssfLoanReceiptForm.value.toDate),
            pageIndex: offset ? offset : this.pageIndex,
            pageSize: this.pageSize,
            sanctionNo: this.nssfLoanReceiptForm.value.sanctionno,
            loanROILessThan: this.nssfLoanReceiptForm.value.loanROILessThan
                ? this.nssfLoanReceiptForm.value.loanROILessThan
                : '',
            loanROIGreaterThan: this.nssfLoanReceiptForm.value.loanROIGreaterThan
                ? this.nssfLoanReceiptForm.value.loanROIGreaterThan
                : '',
            loanROIEquals: this.nssfLoanReceiptForm.value.loanROIEquals
                ? this.nssfLoanReceiptForm.value.loanROIEquals
                : '',
            loanROIBetweenFrom: this.nssfLoanReceiptForm.value.loanROIBetweenFrom
                ? this.nssfLoanReceiptForm.value.loanROIBetweenFrom
                : '',
            loanROIBetweenTo: this.nssfLoanReceiptForm.value.loanROIBetweenTo
                ? this.nssfLoanReceiptForm.value.loanROIBetweenTo
                : '',
            loanAmountLessThan: this.nssfLoanReceiptForm.value.loanAmountLessThan
                ? this.nssfLoanReceiptForm.value.loanAmountLessThan
                : '',
            loanAmountGreaterThan: this.nssfLoanReceiptForm.value.loanAmountGreaterThan
                ? this.nssfLoanReceiptForm.value.loanAmountGreaterThan
                : '',
            loanAmountEquals: this.nssfLoanReceiptForm.value.loanAmountEquals
                ? this.nssfLoanReceiptForm.value.loanAmountEquals
                : '',
            loanAmountBetweenFrom: this.nssfLoanReceiptForm.value.loanAmountBetweenFrom
                ? this.nssfLoanReceiptForm.value.loanAmountBetweenFrom
                : '',
            loanAmountBetweenTo: this.nssfLoanReceiptForm.value.loanAmountBetweenTo
                ? this.nssfLoanReceiptForm.value.loanAmountBetweenTo
                : '',
            amountIn: 'CRORE',
            loanTenure: this.nssfLoanReceiptForm.value.loanTenure,
            transactionDescription: ''
        };

        this.nssfReportsService.getNssfLoanReceipt(payload).subscribe(
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
                // this.dataSource = new MatTableDataSource<any>(response?.result['2016-2017']);
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
