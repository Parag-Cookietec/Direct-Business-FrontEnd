import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonListing } from '../../../common/model/common-listing';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { NssfLoanService } from '../../services/nssf-loan.service';
import { getDPListObject } from '../../model/nssf-loan.data-model';

import * as moment from 'moment';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-nssf-loan-received',
    templateUrl: './nssf-loan-received.component.html',
    styleUrls: ['./nssf-loan-received.component.css']
})
export class NssfLoanReceivedComponent implements OnInit {
    selectedIndex: number;
    tabDisable: Boolean = true;
    nssfLoanReceivedForm: FormGroup;
    addDetailsForm: FormGroup;
    isDetails = false;
    maxDate = new Date();
    todayDate = Date.now();
    errorMessages = dmoMessage;

    typeOfTransactionsCtrl: FormControl = new FormControl();
    typeOfTransactionsList: CommonListing[] = [
        { value: '1', viewValue: 'NSSF Loan Received' },
        { value: '2', viewValue: 'Market Loan Received' },
        { value: '3', viewValue: 'GOI Loan Received' }
    ];

    dataSource: any;
    displayedColumns: any[] = [
        'position',
        'memoNo',
        'adviceNo',
        'dpSheetReciveDate',
        'adviceDate',
        'adviceBy',
        'transactionDesc',
        'creditAmt',
        'addDetailStatus'
    ];

    totalRecords: number = 0;
    pageSize: number = 10;
    pageIndex: number = 0;

    constructor(
        private fb: FormBuilder,
        private storageService: StorageService,
        private toastr: ToastrService,
        private router: Router,
        private _nssfLoanService: NssfLoanService
    ) {}

    ngOnInit() {               

        this.nssfLoanReceivedForm = this.fb.group({
            typeOfTransactions: [''],
            fromDate: [''],
            toDate: ['']
        });
        this.addDetailsForm = this.fb.group({
            sanctionNo: [''],
            sanctionDate: [''],
            loanReceiptDate: [''],
            loanAmount: [''],
            loanTenure: [''],
            moratoriumPeriod: [''],
            rateOfInterest: [''],
            principalInstalmentsInYear: [''],
            principalTotalNoOfInstalments: [''],
            interestInstalmentsInYear: [''],
            interestTotalNoOfInstalments: ['']
        });
    }
    

    /**
     * To convert the date format into (yyyy-mm-dd)
     * @param date default date
     */
    formatDate(date) {
        if (date !== 0 && date !== null && date !== undefined && date !== '') {
            const datePipe = new DatePipe('en-US');
            return datePipe.transform(date, 'yyyy-MM-dd');
        } else {
            return '';
        }
    }

    getDetails(offset=null) {
        this.isDetails = true;
        const dateRange = [
            {
                key: 'adviceDate',
                value: this.formatDate(this.nssfLoanReceivedForm.value.fromDate)
            },
            {
                key: 'adviceDate',
                value: this.formatDate(this.nssfLoanReceivedForm.value.toDate)
            }
        ];
        const param = {
            "pageIndex":offset ? offset : this.pageIndex,
            "pageElement":this.pageSize,
            sortByColumn: '1',
            sortOrder: 'ASC',
            jsonArr: dateRange
        };

        const url = 'dmo/dpentrysheet/nssf';
        this._nssfLoanService.nssfLoanReceivedList(param,url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        // this.toastr.success(res['message']);
                        // console.log(res['result']);
                        if(res['result'].totalElement){
                            this.totalRecords = res['result'].totalElement;
                        }
                        this.dataSource = new MatTableDataSource<any>(res['result'].result);
                    } else {
                        this.toastr.error(res['message']);
                    }
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    onPaginateChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;        
        this.getDetails(this.pageIndex);
    }

    onAddDetails(obj) {
        // this._nssfLoanService.setDPData(obj);
        this._nssfLoanService.dpData = obj;     
        this.router.navigate([`/dashboard/dmo/nssf-loan-received/add-details`]);
    }
    getTabIndex(tabIndex) {
        this.selectedIndex = tabIndex;
        const temp = this.selectedIndex;
    }
    goToNext() {
        this.tabDisable = false;
        this.selectedIndex = 1;
    }
    onSave() {
        this.router.navigate(['/dashboard/dmo/nssf-loan-approved']);
    }
}
