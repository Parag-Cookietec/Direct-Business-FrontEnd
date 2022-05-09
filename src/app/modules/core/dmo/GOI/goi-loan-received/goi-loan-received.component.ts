import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/modules/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { DatePipe } from '@angular/common';
import { GoiService } from '../../services/goi.service';
@Component({
    selector: 'app-goi-loan-received',
    templateUrl: './goi-loan-received.component.html',
    styleUrls: ['./goi-loan-received.component.css']
})
export class GoiLoanReceivedComponent implements OnInit {
    goiLoanReceivedForm: FormGroup;
    isDetails = false;
    private paginator: MatPaginator;
    private sort: MatSort;
    todayDate = Date.now();

    // table data
    elementDate : any[] = []
    
    // dataSource = new MatTableDataSource<any>();
    dataSource:any;

    displayedColumns: string[] = [
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

    @ViewChild(MatSort) set matSort(ms: MatSort) {
        this.sort = ms;
        this.setDataSourceAttributes();
    }

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.setDataSourceAttributes();
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,        
        private goiService: GoiService,
        private storageService: StorageService
    ) {}

    ngOnInit() {    
                    
        this.goiLoanReceivedForm = this.fb.group({
            fromDate: [''],
            toDate: ['']
        });
    }

    onAddDetails(element) {
        console.log(element)              
        this.goiService.dpData = element;        
        this.router.navigate(['./dashboard/dmo/goi/goi-loan-received-add-details']);
    }

    // Method to for setting data source attributes
    setDataSourceAttributes() {
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
    }

    onCancelClick() {
        this.goiLoanReceivedForm.reset();
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

    onPaginateChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;        
        this.getDetails(this.pageIndex);
    }

    getDetails(offset = null) {
        this.isDetails = true;
        const dateRange = [
            {
                key: 'adviceDate',
                value: this.formatDate(this.goiLoanReceivedForm.value.fromDate)
            },
            {
                key: 'adviceDate',
                value: this.formatDate(this.goiLoanReceivedForm.value.toDate)
            }
        ];
        const param = {
            "pageIndex":offset ? offset : this.pageIndex,
            "pageElement":this.pageSize,
            sortByColumn: '1',
            sortOrder: 'ASC',
            jsonArr: dateRange
        };

        const url = 'dmo/dpentrysheet/goi';
        this.goiService.getGOILoanReceivedDetails(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        // this.toastr.success(res['message']);
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
}
