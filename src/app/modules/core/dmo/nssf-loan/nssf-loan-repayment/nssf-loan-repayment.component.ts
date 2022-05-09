import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NssfLoanService } from '../../services/nssf-loan.service';
import { getDPListObject, getNssfPaybleObject } from '../../model/nssf-loan.data-model';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/shared/services/storage.service';
import { element } from 'protractor';

@Component({
    selector: 'app-nssf-loan-repayment',
    templateUrl: './nssf-loan-repayment.component.html',
    styleUrls: ['./nssf-loan-repayment.component.css']
})
export class NssfLoanRepaymentComponent implements OnInit {
    nssfLoanRepaymentForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    ismatchWithPayable = false;
    matchWithPayableData;
    dataSource : any;
    payableAmountsDataSource: any;
    matchWithPayableDataSource: any;
    selectedRow1;
    selectedRow2
    displayedColumns: any[] = [
        'select',
        'position',
        'memoNo',
        'adviceNo',
        'dpDate',
        'adviceDate',
        'adviceBy',
        'transactionDesc',
        'debitAmt'
    ];

    payableAmountsDisplayedColumns: any[] = [
        'select',
        'position',
        // 'loanNo',
        'dueDate', //
        'loanAmount', //
        'payableInterest', //
        'payablePrincipal'
    ];

    matchWithPayableDisplayedColumns: any[] = [
        'memoNo',
        'adviceNo',
        'installDueDate',
        'principalAmount',
        'intrestAmount',
        'unpaidAmount',
        'paidAmount',
        'outstandingAmount'
    ];

    directiveObj = new CommonDirective();
    payload_for_match_payble = {
        id: null,
        dpId: null,
        parentId: null
    };
    
    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private storageService: StorageService,
        private router: Router,
        private _nssfLoanService: NssfLoanService
    ) {}

    ngOnInit() {        
        this.nssfLoanRepaymentForm = this.fb.group({
            fromDate: [''],
            toDate: ['']
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

    radioChange(event, row) {
        console.log(event);
        console.log(row.parentId);
        this.payload_for_match_payble.id = event.value;

        this.payload_for_match_payble.parentId = row.parentId;
    }
    radioChangeactualpaid(event) {
        console.log(event);
        this.payload_for_match_payble.dpId = event.value;
    }
    actualPayble() {
        const param = {
            // adviceNo: 'JG3OIU8',
            // adviceDate: '2019-03-19',
            fromDate: this.formatDate(this.nssfLoanRepaymentForm.value.fromDate),
            toDate: this.formatDate(this.nssfLoanRepaymentForm.value.toDate)
        };

        const url = 'dmo/nssfloanreceived/searchRepay';
        this._nssfLoanService.searchactualpayble(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        // this.toastr.success(res['message']);
                        console.log(res['result']);
                        this.dataSource = new MatTableDataSource(res['result'].dmodpDataDtos);
                        this.payableAmountsDataSource = new MatTableDataSource(res['result'].dmogoiLoanDataDtos);
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
    checkValidation() {
        if (
            this.payload_for_match_payble.id &&
            this.payload_for_match_payble.dpId &&
            this.payload_for_match_payble.parentId
        ) {
            return false;
        } else {
            return true;
        }
    }

    onMatchWithPayable() {
        this.ismatchWithPayable = true;
        const url = 'dmo/nssfloanrepayment/match';
        this._nssfLoanService.matchwithpaybles(this.payload_for_match_payble, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {                        
                        console.log(res['result']);
                        const result = [];
                        result.push(res['result']);
                        this.matchWithPayableData = res['result'];
                        this.matchWithPayableDataSource = new MatTableDataSource(result);
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

    update() {
        const payload = this.matchWithPayableData;

        // extra parameter
        // "adviceNo": "982JLD",
        // "memoNo": null,
        // "paidAmount": 9450.0,

        const url = 'dmo/nssfloanrepayment/401';
        this._nssfLoanService.updateRepayment(payload, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);
                    this.toastr.success(res['result']);
                } else {
                    console.log(res);
                    this.toastr.error(res['message']);
                }
            },
            err => {
                console.log(err);
                this.toastr.error(err);
            }
        );
    }
}
