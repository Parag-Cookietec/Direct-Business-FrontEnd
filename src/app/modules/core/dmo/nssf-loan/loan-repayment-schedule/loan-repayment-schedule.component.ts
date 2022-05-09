// import { CommonDirective } from './../../common/directive/validation.directive';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { LoanRepaymentSchedule } from 'src/app/model/dmo';
import { CommonDirective } from 'src/app/shared/directive/validation.directive';
import { StorageService } from 'src/app/shared/services/storage.service';
import { NssfLoanService } from '../../services/nssf-loan.service';

@Component({
    selector: 'app-loan-repayment-schedule',
    templateUrl: './loan-repayment-schedule.component.html',
    styleUrls: ['./loan-repayment-schedule.component.css']
})
export class LoanRepaymentScheduleComponent implements OnInit {
    // Table Columns for Loan Repayment Schedule Table
    displayedColumns: any[] = [
        'position',
        'financeYearId',
        'installDueDate',
        'openingBalanceAmount',
        'principalAmount',
        'intrestAmount',
        'closingBalAmount'
    ];

    show_table = false;
    // Initialize variables and form
    loanRepaymentScheduleForm: FormGroup;
    todayDate = Date.now();
    directiveObj = new CommonDirective();
    dataSource;

    // Initialize Paginator
    private paginator: MatPaginator;
    private sort: MatSort;

    @ViewChild(MatSort) set matSort(ms: MatSort) {
        this.sort = ms;
        this.setDataSourceAttributes();
    }

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.setDataSourceAttributes();
    }

    constructor(private fb: FormBuilder, 
      private router: Router,
      private storageService: StorageService,
      private _nssfLoanService: NssfLoanService) {}

    // Initialize Form Fields
    ngOnInit() {   
        // const obj = {
        //     access_token: '9984464d-d3a0-458b-980a-bd7c5829457f'
        // };
        // this.storageService.set('currentUser', obj);            
        this.loanRepaymentScheduleForm = this.fb.group({
            sanctionDate: [{ value: '', disabled: true }],
            loanStartDate: [{ value: '', disabled: true }],
            loanAmount: [{ value: '', disabled: true }],
            interestRate: [{ value: '', disabled: true }],
            loanTenure: [{ value: '', disabled: true }],
            moratoriumPeriod: [{ value: '', disabled: true }]
        });

        this.setData();
        this.getRepayment();
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
    setData() {
        this.loanRepaymentScheduleForm.setValue({
            sanctionDate: this.formatDate(this._nssfLoanService.nssfLoanAddedDetails.sanctionOrderDate),
            loanStartDate: this._nssfLoanService.nssfLoanAddedDetails.loanReceiptDate,
            loanAmount: this._nssfLoanService.nssfLoanAddedDetails.loanAmount,
            interestRate: this._nssfLoanService.nssfLoanAddedDetails.loanROI,
            loanTenure: this._nssfLoanService.nssfLoanAddedDetails.loanTenure,
            moratoriumPeriod: this._nssfLoanService.nssfLoanAddedDetails.moratariumPeriod
        });
    }
    // Method to for setting data source attributes
    setDataSourceAttributes() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getRepayment() {
        const param = {
            id: this._nssfLoanService.nssfLoanAddedDetails.id
        };
        const url = 'dmo/nssfloanrepayment/101';
        this._nssfLoanService.getRepayment(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        this.dataSource = new MatTableDataSource<LoanRepaymentSchedule>(res['result']);
                        this.show_table = true;
                    }
                }
            },
            err => {}
        );
    }

    ok(){
      this.router.navigate(['/dashboard/dmo/nssf-loan-received']);
    }
}
