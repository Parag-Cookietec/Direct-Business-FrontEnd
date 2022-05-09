import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { ScrollDistribution } from 'src/app/models/e-pao/epaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScrollDistributionService } from '../services/scroll-distribution/scroll-distribution.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import { element } from 'protractor';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
    selector: 'app-scoll-dstribution',
    templateUrl: './scoll-dstribution.component.html',
    styleUrls: ['./scoll-dstribution.component.css']
})
export class ScollDstributionComponent implements OnInit {
    ELEMENT_DATA: ScrollDistribution[] = [
        {
            scrollNo: 'ENV87484165118421',
            noOfChallan: '100',
            amount: '10000.00'
        },
        {
            scrollNo: 'ENV84165118421',
            noOfChallan: '200',
            amount: '20000.00'
        }
    ];
    // FormGroup
    scrollForm: FormGroup;
    // Date
    maxDate = new Date();
    todayDate = new Date();
    // FormControl
    branchCtrl: FormControl = new FormControl();
    // Table Source
    scrollDataOnSearch: any;
    newdataSource = new MatTableDataSource<any>();
    newdisplayedColumns: string[] = ['srNo', 'scrollNo', 'noOfChallan', 'amount', 'branch', 'newaction'];
    newdisplayedFooterColumns: string[] = ['scrollNo', 'noOfChallan', 'amount', 'branch', 'newaction'];
    selection = new SelectionModel<any>(true, []);
    challan = '0';
    amt = 0;
    @ViewChild(MatSort) sort: MatSort;
    jsonArr: { key: string; value: number }[];
    fileDate: string;
    check: boolean = false;
    branchList: any[];
    refNumber: any;

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        private scrollDistributionService: ScrollDistributionService,
        private stoageService: StorageService
    ) { }

    directiveObject = new EPaoDirectives(this.router, this.dialog);
    // Error Message
    public errorMessages;
    ngOnInit() {
        this.getRefNumber();
        this.errorMessages = EPOAMessage;
        this.scrollData();
        this.newdataSource.sort = this.sort;
        this.getBranchList();
        const userInfo = this.stoageService.get('currentUser');
    }

    getRefNumber() {
        this.scrollDistributionService.getRefNumber({ moduleName: 'SD' }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.refNumber = res['result'] ? res['result'] : '19-20/E-PAO/SC/001';
                }
            },
            err => {
                this.toastr.error(err);
            }

        );
    }


    scrollData() {
        this.scrollForm = this.fb.group({
            fromDate: ['']
        });
    }

    getBranchList() {
        this.scrollDistributionService
            .getBranchNameList({
                pageIndex: 0,
                pageElement: 250,
                jsonArr: [
                    { key: 'trnNo', value: '' },
                    { key: 'fromDate', value: '' },
                    { key: 'toDate', value: '' },
                    { key: 'branchName', value: '' },
                    { key: 'branchTypeId', value: 0 }
                ]
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.branchList = res['result']['result'];
                        this.branchList = this.branchList.filter(itm => itm.branchName !== 'Account Current');
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    convertDateOnly(date) {
        if (date !== '' && date !== undefined && date !== null) {
            date = new Date(date);
            return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
        }
        return '';
    }

    scollDistributionSearch() {
        this.fileDate = this.datepipe
            .transform(this.scrollForm.controls.fromDate.value, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss')
            .toString();
        this.scrollDistributionService
            .searchSDCreateScreen({
                scrollDt: this.fileDate
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.newdataSource.data = res['result'];
                        this.scrollDataOnSearch = res['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    reset() {
        this.challan = '';
        this.amt = 0;
        this.check = false;
        this.selection.clear();
        this.directiveObject.selection.clear();
        this.newdataSource.data = [];
        this.scrollDataOnSearch = [];
    }

    getScrollDistributionList() {
        this.scrollDistributionService
            .getAllScrollDistribution({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.newdataSource.data = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    onVerify() {
        // this.fileDate
        if (this.directiveObject.selection.hasValue()) {
            this.scrollDistributionService.verifyStatus({ scrollDt: this.fileDate, fileHdrId: this.scrollDataOnSearch[0]['fileHdrId'] }).subscribe(
                res => {
                    if (res && res['result'] === 'Scroll Verified!!!' && res['status'] === 200) {
                        this.check = true;
                        this.toastr.success('Scroll Verified');
                    } else if (res['result'] === 'Scroll Not verified return Back to Verification To RBI') {
                        this.toastr.error(res['result']);
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
        } else {
            this.toastr.error('Please, Select The Branch ');
        }
    }

    onDistribute() {
        const userInfo = this.stoageService.get('currentUser');
        if (this.directiveObject.selection.hasValue()) {

            this.directiveObject.selection['selected'].forEach(element => {
                 this.branchList.filter(itm => {
                   
                     if (itm.branchName === element.branchName) {
                        // element.branchId.push(itm.branchId)
                        element.branchId = itm.branchId;
                        element.haId = userInfo.usercode;
                    }
                 
                });
            });
            this.scrollDistributionService.createScrollDistribution(this.directiveObject.selection['selected']).subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.directiveObject.selection.clear();
                        this.reset();
                        this.toastr.success(res['result']);
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
        } else if(this.newdataSource.data[0].branchName === null) {
            this.toastr.error('Please, Select The Record');
        }

    }

    onSelect(event: { source: { selected: any } }, bl: any, i) {
        if (event.source.selected) {
            this.scrollDataOnSearch[i].branchName = event.source['value'];
        }
    }

    isAllSelected() {
        // shows value as per row selected
        if (this.selection.selected.length === 1) {
            this.amt = this.selection.selected[0].totChallanAmt;
            this.challan = this.selection.selected[0].noOfChallans;
        } else if (this.selection.selected.length === 2) {
            this.challan = '300';
            this.amt = 30000;
        } else if (this.selection.selected.length === 0) {
            this.challan = '';
            this.amt = 0;
        }

        const numSelected = this.selection.selected.length
        ;
        //const numRows = this.newdataSource.data.length ? this.newdataSource.data.length : 0;
        return numSelected;
    }

    masterToggle() {
        this.isAllSelected()
          ? this.selection.clear()
          : this.newdataSource.data.forEach((row) => this.selection.select(row));
      }

  /** Whether the number of selected elements matches the total number of rows. */
//   isAllSelected() {
//     const numSelected = this.selection.selected.length;
//     console.log(this.selection.selected);
//     const numRows = this.newdataSource.data.length;
//     return numSelected === numRows;
//   }

//   /** Selects all rows if they are not all selected; otherwise clear selection. */
//   masterToggle() {
//     this.isAllSelected()
//       ? this.selection.clear()
//       : this.newdataSource.data.forEach((row) => this.selection.select(row));
//   }


    // updateTotal(event) {
    //     console.log(event);
    //     this.isAllSelected(event)
    //         ? this.selection.clear()
    //         : this.newdataSource.data.forEach(row => this.selection.select(row));
    // }

    toggle(){
        this.isAllSelected()
        ? this.selection.clear()
        : this.newdataSource.data.forEach(row => this.selection.select(row));
    }


    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }



 

    // Navigation
    navigate() {
        this.router.navigate(['/dashboard/e-pao/scroll-distribution-listing'], { skipLocationChange: true });
    }

    totalChallan(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.noOfChallans);
        });
        return amountExp;
    }

    totalAmmount(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.totChallanAmt);
        });
        return amountExp;
    }

    openReport(): void {
        const dialogRef = this.dialog.open(ScrollDistributionDialogeComponent, {
            width: '1200px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        });
    }

    openView(): void {
        const dialogRef = this.dialog.open(ScrollDistributionViewDialogeComponent, {
            width: '1200px',
            data: { rbiFileHdrId: this.scrollDataOnSearch[0].fileHdrId }
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        });
    }

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
}

// report dialog
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'scroll-distribution-dialoge',
    templateUrl: 'scroll-distribution-dialoge.html'
})
export class ScrollDistributionDialogeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private scrollDistributionService: ScrollDistributionService,
        public dialogRef: MatDialogRef<ScrollDistributionDialogeComponent>,

        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);

    newdataSource = new MatTableDataSource<any>();
    newdisplayedColumns: string[] = ['date', 'noOfScroll', 'scrollAmt', 'noOfTxn', 'amount', 'noOfTxnDiff'];
    newdisplayedFooterColumns: string[] = ['date', 'noOfScroll', 'scrollAmt', 'noOfTxn', 'amount', 'noOfTxnDiff'];

    vitocancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.scrollDistributionService.getReport({}).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.newdataSource.data = res['result'];
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    totalChallan(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.noOfChallans);
        });
        return amountExp;
    }

    totalNoOfEScroll(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.noOfEScroll);
        });
        return amountExp;
    }

    totalAmmount(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.amountAccounting);
        });
        return amountExp;
    }

    totalNotification(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.noOfNotification);
        });
        return amountExp;
    }

    totalEScrollAmmount(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.amountEScroll);
        });
        return amountExp;
    }
}

// view  dialog
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'scroll-distribution-view-dialoge',
    templateUrl: 'scroll-distribution-view-dialoge.html'
})
export class ScrollDistributionViewDialogeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private datepipe: DatePipe,
        private scrollDistributionService: ScrollDistributionService,
        public dialogRef: MatDialogRef<ScrollDistributionViewDialogeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);

    newdataSource = new MatTableDataSource<any>();
    displayedColumns: string[] = ['srNo', 'transactionDttm', 'CinNo', 'CpinNo', 'tax', 'transactionAmt'];
    displayedFooterColumns: string[] = ['srNo', 'transactionDttm', 'CinNo', 'CpinNo', 'tax', 'transactionAmt'];

    vitocancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // const date = this.datepipe.transform(this.data.transactionDttm, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss');
        this.scrollDistributionService.OnClickViewScroll({ rbiFileHdrId: this.data.rbiFileHdrId }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.newdataSource.data = res['result'];
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    totalChallan(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.transactionAmt);
        });
        return amountExp;
    }
}
