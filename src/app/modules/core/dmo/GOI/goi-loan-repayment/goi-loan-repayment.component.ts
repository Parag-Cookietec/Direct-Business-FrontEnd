import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { MatTableDataSource } from '@angular/material/table';
import { CommonDirective } from 'src/app/shared/directive/validation.directive';
import { StorageService } from 'src/app/shared/services/storage.service';
import { GoiService } from '../../services/goi.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-goi-loan-repayment',
    templateUrl: './goi-loan-repayment.component.html',
    styleUrls: ['./goi-loan-repayment.component.css']
})
export class GoiLoanRepaymentComponent implements OnInit {
    errorMessages = dmoMessage;
    todayDate = new Date();

    goiLoanRepaymentForm: FormGroup;

    directiveObj = new CommonDirective();
    ismatchWithPayable = false;
    selectedRow1;
    selectedRow2;
    // table data

    payload_for_match_payble = {
        id: null,
        dpId: null,
        parentId: null
    };
    matchWithPayableData;

    dataSource = new MatTableDataSource<any>();
    payableAmountsDataSource = new MatTableDataSource<any>();
    matchWithPayableDataSource = new MatTableDataSource<any>();
    actualandpayble;
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
        'nameOfMinistry', 
        'planSchemeName', 
        'srPageNo', 
        'dueDate', 
        'loanAmount', 
        'interestRate', 
        'loanOutstanding', 
        'payablePrincipal', 
        'payableInterest',
        'paidPrincipal',
        'paidInterest'
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


    constructor(
        private fb: FormBuilder,
        private goiService: GoiService,
        private toastr: ToastrService,
        private storageService: StorageService
    ) {}

    ngOnInit() {          
        this.goiLoanRepaymentForm = this.fb.group({
            fromDate: [''],
            toDate: [''],
            adviceDate: [''],
            adviceNo: ['']
        });
    }

    onCancelClick() {
        this.goiLoanRepaymentForm.reset();
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
      const url = 'dmo/goiloanrepayment/match';
      this.goiService.matchwithpaybles(this.payload_for_match_payble, url).subscribe(
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

    actualPayble() {
        const param = {
            adviceNo: this.goiLoanRepaymentForm.value.adviceNo,
            adviceDate: this.goiLoanRepaymentForm.value.adviceDate,
            fromDate: this.formatDate(this.goiLoanRepaymentForm.value.fromDate),
            toDate: this.formatDate(this.goiLoanRepaymentForm.value.toDate)
        };

        const url = 'dmo/goiloanreceived/searchRepay';
        this.goiService.searchactualpayble(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        console.log(res['result']);
                        this.actualandpayble = res['result']
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

    update() {
      const payload = this.matchWithPayableData;

      // extra parameter
      // "adviceNo": "982JLD",
      // "memoNo": null,
      // "paidAmount": 9450.0,

      const url = 'dmo/goiloanrepayment/401';
      this.goiService.updateRepayment(payload, url).subscribe(
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
