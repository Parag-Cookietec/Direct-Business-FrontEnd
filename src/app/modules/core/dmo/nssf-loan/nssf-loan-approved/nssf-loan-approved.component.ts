import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../services/nssf-loan.service';
import * as moment from 'moment';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-nssf-loan-approved',
    templateUrl: './nssf-loan-approved.component.html',
    styleUrls: ['./nssf-loan-approved.component.css']
})
export class NssfLoanApprovedComponent implements OnInit {
    nssfLoanApprovedForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();

    directiveObj = new CommonDirective();
    dataSource: any;

    displayedColumns: any[] = [
        'select',
        'position',
        'sanctionOrderNo',
        'loanStartDate',
        'loanReceiptDate',
        'loanAmount',
        'loanTenure',
        'moratariumPeriod',
        'loanROI',
        'status',
        'action'
    ];

    totalRecords: number = 0;
    pageSize: number = 10;
    pageIndex: number = 0;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private dataService: DataService,
        private storageService: StorageService,
        private _nssfLoanService: NssfLoanService
    ) {}

    ngOnInit() {
        this.nssfLoanApprovedForm = this.fb.group({
            loanNo: [''],
            fromDate: [''],
            toDate: ['']
        });
        let reqObj = {
            pageIndex: 0,
            pageElement: 10,
            jsonArr: []
        };
        // this.fetchReceivedLoanList(reqObj);
    }

    onPaginateChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.onSubmit(this.pageIndex);
        // this.pageSize = event.pageSize;
        // this.pageIndex = event.pageIndex;
        // const dpObj = {
        //     pageIndex: event.pageIndex,
        //     pageElement: event.pageSize,
        //     jsonArr: []
        // };
        // this.fetchReceivedLoanList(dpObj);
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

    onSubmit(offset = null) {
        const param = {
            pageIndex: offset ? offset : this.pageIndex,
            pageElement: this.pageSize,
            adviceNo: this.nssfLoanApprovedForm.value.loanNo,
            fromDate: this.formatDate(this.nssfLoanApprovedForm.value.fromDate),
            toDate: this.formatDate(this.nssfLoanApprovedForm.value.toDate)
        };

        const url = 'dmo/nssfloanreceived/201';
        this._nssfLoanService.getnssfLoanApprovedDetails(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        // this.toastr.success(res['message']);
                        if (res['result'].totalElement) {
                            this.totalRecords = res['result'].totalElement;
                        }
                        console.log(res['result']);
                        this.dataSource = new MatTableDataSource(res['result']['result']);
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

    onApprove(obj) {
        this._nssfLoanService.setLoanId(obj.id);
        this.router.navigate(['/dashboard/dmo/nssf-loan-approved/approve']);
    }

    // onEdit(id) {
    //     this.dataService.setOption('fromApproved', 'editMode');
    //     this.router.navigate([`/dashboard/dmo/nssf-loan-received/add-details/${id}`]);
    // }

    onEdit(element, viewonly) {
        this._nssfLoanService.dpid = element.id;
        this._nssfLoanService.dpData = element;
        this.router.navigate(['./dashboard/dmo/nssf-loan-received/add-details']);
        this._nssfLoanService.isEdit = true;
        if (viewonly) {
            this._nssfLoanService.isView = true;
        }
    }
}
