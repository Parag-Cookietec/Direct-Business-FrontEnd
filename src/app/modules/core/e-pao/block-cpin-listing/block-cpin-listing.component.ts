import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { BlokPinListing } from 'src/app/models/e-pao/epaoModel';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import { BlockCpinService } from '../services/block-cpin/block-cpin.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';

@Component({
    selector: 'app-block-cpin-listing',
    templateUrl: './block-cpin-listing.component.html',
    styleUrls: ['./block-cpin-listing.component.css']
})
export class BlockCpinListingComponent implements OnInit {
    // Form Group
    blockCpinForm: FormGroup;

    private paginator: MatPaginator;
    private sort: MatSort;

    pageSize = 1;
    showFirstLastButtons;
    pageSizeOptions = [1, 5, 10, 20, 50, 100];
    totalPages: number = 0;
    pageIndex: number = 0;
    tableData: any = [];



    // Date
    initiatiomdate = Date.now();
    maxDate = new Date();

    dataSource = new MatTableDataSource(this.tableData);

    directiveObject = new EPaoDirectives(this.router, this.dialog);

    // Table Source

    dataColumns = ['position', 'refrenceNo', 'referenceDt', 'cpinNo', 'recStatus', 'cpinAmount', 'action'];

    jsonArr: { key: string; value: number }[];


    public errorMessages;

    @ViewChild(MatPaginator, { read: true }) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
    }

    @ViewChild(MatSort) set matSort(ms: MatSort) {
        this.sort = ms;
        this.setDataSourceAttributes();
    }


    filterData: {
        position: string; refrenceNo: string; referenceDt: string; cpinNo: string; recStatus: string;
        cpinAmount: string; govtCreditDt: string; cpinDt: string
    };

    navigationExtras: NavigationExtras = {};
    isEditable: boolean;


    constructor(
        private fb: FormBuilder,
        private datepipe: DatePipe,
        private toastr: ToastrService,
        public dialog: MatDialog,
        private router: Router,
        private blockCpinService: BlockCpinService
    ) { }

    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.filterData = { position: "", refrenceNo: "", referenceDt: "", cpinNo: "", recStatus: "", cpinAmount: "", govtCreditDt: "", cpinDt: "" };
        //this.blockCpinForm = this.blockCpinListingFormData();
        this.blockCpinForm = this.clearFilter();
        this.pageSize = 1;
        this.doSearch(this.filterData);
        this.getBlockCpinList();
    }



    setDataSourceAttributes() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        if (this.paginator && this.sort) {
            this.applyFilter('');
        }
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }


    PageEvents(event: PageEvent) {
        this.updatePageSize(event);
        //console.log(event, 'total pageSize', this.pageSize)
        //console.log(event, 'total pages', this.totalPages)
        //console.log(event, 'current page Index', this.pageIndex)
        this.doSearch(this.filterData);

    }



    clearFilter() {
        return (this.blockCpinForm = this.fb.group({
            cpinNo: [''],
            cinNo: [''],
            cpinDt: [''],
            cpinAmount: [''],
            govtCreditDt: [''],
            referenceDt: ['']
        }));
    }


    resetListing(): void {
        this.clearFilter();
        this.doSearch(this.filterData);

    }


    convertDateOnly(date) {
        if (date !== '' && date !== undefined && date !== null) {
            date = new Date(date);
            return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
        }
        return '';
    }

    convertDateTime(date) {
        if (date !== '' && date !== undefined && date !== null) {
            date = new Date(date);
            return this.datepipe.transform(date, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss').toString();
        }
        return '';
    }


    onSearch(data: any): void {

        data.cpinDt = this.convertDateOnly(data.cpinDt);
        data.govtCreditDt = this.convertDateOnly(data.govtCreditDt);
        data.referenceDt = this.convertDateTime(data.referenceDt);
        this.doSearch(data);
    }


    doSearch(value): void {

        this.blockCpinService.getBlockCpinListOnSearch(value).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.initDataTable(res['result']);
                    //this.newdataSource = res['result'];
                    this.dataSource = res['result']['result'];
                    // this.dataSource.data = res['result'];
                    this.clearFilter();
                }
            },
            err => {
                this.toastr.error(err);
            }
        );

    }


    updatePageSize(event): void {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
    }

    initDataTable(result): void {
        if (result && result?.size) {
            this.totalPages = Math.ceil(result?.totalElement / this.pageSize);
        }

    }


    openView(element) {
        this.router.navigate(['/dashboard/e-pao/block-cpin'],
            {
                state: {
                    visible: false,
                    showBtn: false,
                    cinNo: element['cpinNo'],
                    recordType: 'CPIN'
                },
                skipLocationChange: true
            }
        );  
    }

    openEdit(element) {

        // this.isEditable = true;

        this.router.navigate(['/dashboard/e-pao/block-cpin'],
            {
                state: {
                    visible: false,
                    showBtn: true,
                    cinNo: element['cpinNo'],
                    recordType: 'CPIN'
                },
                skipLocationChange: true
            }
        );
    }


    // convertDateOnly(date) {
    //     if (date !== '' && date !== undefined && date !== null) {
    //         date = new Date(date);
    //         return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
    //     }
    //     return '';
    // }

    // listingData(): void {
    //     this.jsonArr = [
    //         {
    //             key: 'activeStatus',
    //             value: 1
    //         }
    //     ];
    //     const value = this.blockCpinForm.value;
    //     for (const key in value) {
    //         if (value[key]) {
    //             const feild = value[key] instanceof String ? value[key].trim().replace('\t', '') : value[key];
    //             this.jsonArr.push({
    //                 key,
    //                 value: moment.isMoment(feild)
    //                     ? this.convertDateOnly(feild)
    //                     : key === 'cinNo'
    //                     ? feild
    //                     : parseFloat(feild) !== NaN
    //                     ? parseFloat(feild)
    //                     : feild
    //             });
    //         }
    //     }
    //     this.blockCpinListOnSearch(value);
    // }

    // blockCpinListOnSearch(value) {
    //     value.govtCreditDt = this.convertDateOnly(value.govtCreditDt);
    //     value.cpinDt = this.convertDateOnly(value.cpinDt);
    //     if (value.referenceDt === null || value.referenceDt === '') {
    //         value.referenceDt = '';
    //     } else {
    //         value.referenceDt = this.datepipe.transform(value.referenceDt, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss').toString();
    //     }
    //     this.blockCpinService.getBlockCpinListOnSearch(value).subscribe(
    //         res => {
    //             if (res && res['result'] && res['status'] === 200) {
    //                 this.dataSource = res['result'];
    //             }
    //         },
    //         err => {
    //             this.toastr.error(err);
    //         }
    //     );
    // }

    // On close to open ProceedDialogComponent
    onClose() {
        const dialogRef = this.dialog.open(ProceedDialogComponent, {
            width: '300px',
            height: 'auto',
            data: ''
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'yes') {
                this.router.navigate(['/dashboard'], { skipLocationChange: true });
            }
        });
    }

    getBlockCpinList(): void {
        this.blockCpinService
            .getBlockCpinList({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.dataSource = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    // resetListing(): void {
    //     this.blockCpinForm.reset();
    //     this.dataSource.data = [];
    //     this.getBlockCpinList();
    // }
}

// view  dialog
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'block-cpin-listing-dialoge',
    templateUrl: 'block-cpin-listing-dialoge.html'
})
export class BlockCpinListingDialogeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private router: Router,
        public dialogRef: MatDialogRef<BlockCpinListingDialogeComponent>,
        private blockCpinService: BlockCpinService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);

    newdataSource = new MatTableDataSource<any>();
    displayedColumns: string[] = ['position', 'refrenceNo', 'referenceDt', 'cpinNo', 'recStatus', 'cpinAmount'];

    vitocancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.blockCpinService.getBlockCpinViewById({ id: this.data.id }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.newdataSource.data = [res['result']];
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }
}
