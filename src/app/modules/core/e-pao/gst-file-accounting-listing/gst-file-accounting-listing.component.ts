import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, formatDate } from '@angular/common';
import { GstFileAccountingService } from '../services/gst-file-accounting/gst-file-accounting.service';
import * as moment from 'moment';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import {
    CreditPrintReport,
    EODCinDetailsReport,
    FilePrintReport,
    GSTFileAccountingListing,
    VoucherPrintReport,
    VoucherYearPrintReport
} from 'src/app/models/e-pao/epaoModel';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { CommonWorkflowService } from '../../common/workflow-service/common-workflow.service';

@Component({
    selector: 'app-gst-file-accounting-listing',
    templateUrl: './gst-file-accounting-listing.component.html',
    styleUrls: ['./gst-file-accounting-listing.component.css']
})
export class GstFileAccountingListingComponent implements OnInit {

    private paginator: MatPaginator;
    private sort: MatSort;
    newSearch: boolean = false;
    newSearchParam: number = 0;
    pouId: number;
    menuId: number;
   
    @ViewChild(MatSort) set matSort(ms: MatSort) {
      this.sort = ms;
      this.setDataSourceAttributes();
    }
   
    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
      this.paginator = mp;
      this.setDataSourceAttributes();
    }

    ELEMENT_DATA: EODCinDetailsReport[] = [
        {
            gstin: 'WEWQE2324234',
            cin: 'CSDD123242',
            paymentDate: '01/12/2018',
            bankCD: 'ALLA',
            sgstTax: '33.00',
            sgstIntr: '0.00',
            sgstFee: '2,175.00',
            sgstPenalty: '0.00',
            sgstOther: '0.00',
            sgstTotal: '2,208.00',
            fileDate: '01/12/2018'
        },
        {
            gstin: 'WEWQE2324234',
            cin: 'CSDD123242',
            paymentDate: '01/12/2018',
            bankCD: 'ALLA',
            sgstTax: '33.00',
            sgstIntr: '0.00',
            sgstFee: '2,175.00',
            sgstPenalty: '0.00',
            sgstOther: '0.00',
            sgstTotal: '2,208.00',
            fileDate: '01/12/2018'
        },
        {
            gstin: 'WEWQE2324234',
            cin: 'CSDD123242',
            paymentDate: '01/12/2018',
            bankCD: 'ALLA',
            sgstTax: '33.00',
            sgstIntr: '0.00',
            sgstFee: '2,175.00',
            sgstPenalty: '0.00',
            sgstOther: '0.00',
            sgstTotal: '2,208.00',
            fileDate: '01/12/2018'
        }
    ];


    setDataSourceAttributes() {
        this.newdataSource.paginator = this.paginator;
        this.newdataSource.sort = this.sort;
    
        if (this.paginator && this.sort) {
          this.applyFilter('');
        }
      }

      applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.newdataSource.filter = filterValue;
      }

    maxDate = new Date();
    // todayDate = new Date();
    gftFileAccountingForm: FormGroup;
    newdataSource = new MatTableDataSource<Array<GSTFileAccountingListing>>();
    newdisplayedColumns: string[] = [
        'srNo',
        'referenceNo',
        'referenceDt',
        'challanDt',
        'voucherNo',
        'noOfChallans',
        'totChallanAmt',
        'newaction'
    ];
    jsonArr: { key: string; value: number }[];
    currentDayData: { fileName: string; fromDate: string; toDate: string; referenceNo: string };

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        private commonWorkflowService: CommonWorkflowService,
        private gstFileAccountingService: GstFileAccountingService, 
        private datePipe: DatePipe
    ) { }
    public errorMessages;

    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.gftFileAccountingForm = this.gftFileAccountingData();
        this.commonWorkflowService.getCurrentUserDetail().then((res: any) => {
            console.log(res, 'currentuserdetails')
            this.pouId = res.lkPOUId;
            this.menuId = res.linkMenuId;
            if (this.pouId)
                this.gstFileAccountingListV2();
          });
        //this.gstFileAccountingList();
    }

    gftFileAccountingData() {
        return this.fb.group({
            fileName: [''],
            fromDate: [''],
            toDate: [''],
            referenceNo: ['']
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

    // get all list
    gstFileAccountingList(): void {
        this.gstFileAccountingService
            .getAllGstAccountingList({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.newdataSource = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    // get all list
    gstFileAccountingListV2(): void {
        if (
            this.newSearch && (
              this.gftFileAccountingForm.value.fileName ||
              this.gftFileAccountingForm.value.fromDate ||
              this.gftFileAccountingForm.value.toDate ||
              this.gftFileAccountingForm.value.referenceNo )
          ) {
            this.newSearchParam = 1;
          } else {
            this.newSearchParam = 0;
          }

        let jsonObj =[];
        jsonObj.push({
            "key": "pouId",
            "value": this.pouId.toString()
          });
          jsonObj.push({
            "key": "menuId",
            "value": this.menuId.toString()
          });
          jsonObj.push({
            "key": "wfStatus",
            "value": ""
          });
          jsonObj.push({
            "key": "isSearch",
            "value": this.newSearchParam.toString()
          });
          jsonObj.push({
            "key": "status",
            "value":  ""
          });
          if(this.gftFileAccountingForm.value.fileName){
            jsonObj.push({
              "key": "fileName",
              "value": this.gftFileAccountingForm.value.fileName ? this.gftFileAccountingForm.value.fileName : ""
            });
          }
          if(this.gftFileAccountingForm.value.referenceNo){
            jsonObj.push({
              "key": "referenceNo",
              "value": this.gftFileAccountingForm.value.referenceNo ? this.gftFileAccountingForm.value.referenceNo : ""
            });
          }
          if(this.gftFileAccountingForm.value.fromDate){
            jsonObj.push({
              "key": "fromDate",
              "value": this.gftFileAccountingForm.value.fromDate ? this.datePipe.transform(this.gftFileAccountingForm.value.fromDate, 'MM/dd/yyyy').toString() : ""
            });
          }
          if(this.gftFileAccountingForm.value.toDate){
            jsonObj.push({
              "key": "toDate",
              "value": this.gftFileAccountingForm.value.toDate ? this.datePipe.transform(this.gftFileAccountingForm.value.toDate, 'MM/dd/yyyy').toString() : ""
            });
          }
        this.gstFileAccountingService
            .getAllGstAccountingListV2({
                pageIndex: 0,
                pageElement: 10,
                jsonArr: jsonObj
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.newdataSource = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    search() {
        this.newSearch = true;
        this.gstFileAccountingListV2();
     }

    resetListing(): void {
        this.newSearch=false;
        this.gftFileAccountingData();
        this.gstFileAccountingListV2();
        //this.gstFileAccountingList();
        // this.gftFileAccountingListOnSearch(this.currentDayData);
    }

    convertDateOnly(date) {
        if (date !== '' && date !== undefined && date !== null) {
            date = new Date(date);
            return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
        }
        return '';
    }

    //search call

    listingData(data: any): void {
        this.jsonArr = [
            {
                key: 'activeStatus',
                value: 1
            }
        ];
        if (data.fileName === null) {
            data.fileName = '';
        } else if (data.referenceNo === null) {
            data.referenceNo = '';
        }
        const value = data;
        for (const key in value) {
            if (value[key]) {
                const feild = value[key] instanceof String ? value[key].trim().replace('\t', '') : value[key];
                this.jsonArr.push({
                    key,
                    value: moment.isMoment(feild)
                        ? this.convertDateOnly(feild)
                        : key === 'fileName'
                            ? feild
                            : parseFloat(feild) !== NaN
                                ? parseFloat(feild)
                                : feild
                });
            }
        }
        this.gftFileAccountingListOnSearch(value);
    }

    gftFileAccountingListOnSearch(value): void {
        value.fromDate = this.datepipe.transform(value.fromDate, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss');
        value.toDate = this.datepipe.transform(value.toDate, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss');
        this.gstFileAccountingService.getGstAccListOnSearch(value).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.newdataSource = res['result'];
                    this.gftFileAccountingData();
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    openView(element) {
        this.router.navigate(['/dashboard/e-pao/gst-file-accounting'],
            {
                state: {
                    visible: true,
                    showBtn: false,
                    isCheck: true,
                    disableSearch:false,
                    fileName: element['fileName'],
                    refNumber: element['referenceNo']
                },
                skipLocationChange: true
            }
        );
    }

    openEdit(element) {
        this.router.navigate(['/dashboard/e-pao/gst-file-accounting'],
            {
                state: {
                    visible: false,
                    showBtn: false,
                    isCheck: true,
                    disableSearch: true,
                    fileName: element['fileName'],
                    id: element.id,
                    refNumber: element['referenceNo']
                },
                skipLocationChange: true
            }
        );
    }

    // openView(id): void {
    //     const dialogRef = this.dialog.open(GstFileAccountingListingDialogeComponent, {
    //         width: '1200px',
    //         data: {
    //             id
    //         }
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //     });
    // }

    // openEdit(id: number): void {
    //     // tslint:disable-next-line: no-use-before-declare
    //     const dialogRef = this.dialog.open(GstFileAccountingListingEditDialogeComponent, {
    //         width: '1200px',
    //         data: {
    //             id
    //         }
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed', result);
    //         result && result['isUpdated'] && this.gstFileAccountingList();
    //     });
    // }

    openPrint(element): void {
        // tslint:disable-next-line: no-use-before-declare
        const dialogRef = this.dialog.open(GstFileAccountingListingPrintDialogeComponent, {
            width: '1200px',
            data: {
                element
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            result && result['isUpdated'] && this.gstFileAccountingList();
        });
    }
}

// view gst file listing dialog

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'gst-file-accounting-dialoge',
    templateUrl: 'gst-file-accounting-listing-dialoge.html'
})
export class GstFileAccountingListingDialogeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private router: Router,
        public dialogRef: MatDialogRef<GstFileAccountingListingDialogeComponent>,
        private gstFileAccountingService: GstFileAccountingService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);
    newdataSource = new MatTableDataSource<any>();
    newdisplayedColumns: string[] = [
        'srNo',
        'referenceNo',
        'referenceDt',
        'challanDt',
        'voucherNo',
        'noOfChallans',
        'totChallanAmt'
    ];

    vitocancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.gstFileAccountingService.getFileAccountingListingById({ id: this.data.id }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res);
                    this.newdataSource.data = [res['result']];
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }
}

// edit gst file listing dialog

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'gst-file-accounting-listing-edit-dialoge',
    templateUrl: 'gst-file-accounting-listing-edit-dialoge.html'
})
export class GstFileAccountingListingEditDialogeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private router: Router,
        public dialogRef: MatDialogRef<GstFileAccountingListingEditDialogeComponent>,
        private gstFileAccountingService: GstFileAccountingService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService,
        @Inject(LOCALE_ID) private locale: string
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);
    newdataSource = new MatTableDataSource<any>();
    newdisplayedColumns: string[] = ['srNo', 'fileName', 'fileDate', 'totFileCnt'];
    maxDate = new Date();

    vitocancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.gstFileAccountingService.getFileAccounting({ id: this.data.id }).subscribe(
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

    updateGstFileAcc() {
        // this.directiveObject.workflowDetails();
        const reqParams = this.newdataSource.data[0];
        reqParams['fileDate'] = formatDate(reqParams['fileDate'], 'yyyy-MM-dd', this.locale);
        if (reqParams['fileDate']) {
            reqParams['fileDate'] = formatDate(reqParams['fileDate'], 'yyyy-MM-dd', this.locale);
        }
        reqParams['fileName'] = reqParams['fileName'].toString();
        reqParams['totFileCnt'] = parseFloat(reqParams['totFileCnt']);
        this.gstFileAccountingService.updateGstFileAccList(reqParams).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.toastr.success('record updated successfully');
                    this.dialogRef.close({ isUpdated: true });
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }
}

//On Print Voucher

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'gst-file-accounting-listing-print-dialoge',
    templateUrl: 'gst-file-accounting-listing-print-dialoge.html'
})
export class GstFileAccountingListingPrintDialogeComponent implements OnInit {
    ELEMENT_DATA: VoucherPrintReport[] = [
        {
            dh: '8658-00-108-01-02-0000',
            desc: 'RESERVE BANK OF INDIA, PAD',
            txn: '8',
            amt: '100'
        },
        {
            dh: '8658-00-108-01-03-0000',
            desc: 'ANDHRA BANK',
            txn: '8',
            amt: '100'
        },
        {
            dh: '8658-00-108-01-04-0000',
            desc: 'BANK OF BARODA ',
            txn: '4',
            amt: '100'
        },
        {
            dh: '8658-00-108-01-05-0000',
            desc: 'DENA BANK',
            txn: '4',
            amt: '100'
        }
    ];

    CERDIT_DATA: CreditPrintReport[] = [
        {
            ch: '0006-00-101-01-00-0000',
            cdesc: 'STATE GOODS AND SERVICES TAX(SGST) TAX',
            ctxn: '',
            camt: '100.00'
        },
        {
            ch: '0006-00-102-01-00-0000',
            cdesc: 'STATE GOODS AND SERVICES TAX(SGST) INTEREST',
            ctxn: '',
            camt: '100.00'
        },
        {
            ch: '0006-00-103-01-00-0000',
            cdesc: 'STATE GOODS AND SERVICES TAX(SGST) PENALTY',
            ctxn: ' ',
            camt: '100.00'
        }
    ];

    FILE_DATA: FilePrintReport[] = [
        // {
        //   fileNo: '0006-00-101-01-00-0000',
        //   ftxn: 'STATE GOODS AND SERVICES TAX(SGST) TAX',
        //   fdt: '',
        //   famt: '',
        // },
        // {
        //   fileNo: '0006-00-101-01-00-0000',
        //   ftxn: 'STATE GOODS AND SERVICES TAX(SGST) TAX',
        //   fdt: '',
        //   famt: '',
        // },
        // {
        //   fileNo: '0006-00-101-01-00-0000',
        //   ftxn: 'STATE GOODS AND SERVICES TAX(SGST) TAX',
        //   fdt: '',
        //   famt: '',
        // },
    ];

    VOUCHER_DATA: VoucherYearPrintReport[] = [
        {
            voucherNo: '0006-00-101-01-00-0000',
            yymmxxx: 'STATE GOODS AND SERVICES TAX(SGST) TAX',
            vdt: '',
            vyear: ''
        },
        {
            voucherNo: '0006-00-101-01-00-0000',
            yymmxxx: 'STATE GOODS AND SERVICES TAX(SGST) TAX',
            vdt: '',
            vyear: ''
        },
        {
            voucherNo: '0006-00-101-01-00-0000',
            yymmxxx: 'STATE GOODS AND SERVICES TAX(SGST) TAX',
            vdt: '',
            vyear: ''
        }
    ];

    // date
    maxDate = new Date();
    todayDate = new Date();

    // error message
    public errorMessages;

    // form group
    voucherPrintForm: FormGroup;

    // this.ELEMENT_DATA
    // table source
    newdataSource = new MatTableDataSource<any>();
    newdisplayedColumns: string[] = ['dh', 'desc', 'txn', 'amount'];
    newdisplayedColumns1: string[] = ['1', '2', '3', '4'];
    newdisplayedFooterColumns: string[] = ['dh', 'desc', 'txn', 'amount'];

    // credit table source
    newdataSource2 = new MatTableDataSource<any>();
    newdisplayedColumns2: string[] = ['ch', 'cdesc', 'ctxn', 'amount'];
    newdisplayedColumns3: string[] = ['1', '2', '3', '4'];
    newdisplayedFooterColumns1: string[] = ['ch', 'cdesc', 'ctxn', 'amount'];
    // File table data source
    newdataSource10 = new MatTableDataSource<any>();
    newdisplayedColumns11: string[] = ['srNo', 'fileNo', 'ftxn', 'fdt', 'famt'];
    newdisplayedColumns12: string[] = ['1', '2', '3', '4', '5'];
    newdisplayedFooterColumns2: string[] = ['srNo', 'fileNo', 'ftxn', 'fdt', 'famt'];

    // voucher table data sources
    newdataSource20 = new MatTableDataSource<any>(this.VOUCHER_DATA);
    newdisplayedColumns21: string[] = ['voucherNo', 'yymmxxx', 'vdt', 'vyear'];
    newdisplayedColumns22: string[] = ['1', '2', '3', '4'];
    newdisplayedFooterColumns3: string[] = ['voucherNo', 'yymmxxx', 'vdt', 'vyear'];
    voucherData: any = { refrenceNo: '', refrenceDt: '', fileDate: '', voucherNo: '' };

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<GstFileAccountingListingPrintDialogeComponent>,
        private gstFileAccountingService: GstFileAccountingService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService
    ) { }

    directiveObject = new EPaoDirectives(this.router, this.dialog);

    ngOnInit(): void {
        this.gstFileAccountingService
            .getVoucherByVoucherNo({
                voucherNo: this.data.element.voucherNo,
                challanDt: this.data.element.challanDt,
                fileProcessId: this.data.element.fileProcessId
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.voucherData = res['result'];
                        this.newdataSource.data = res['result']['dtos'];
                        this.newdataSource2.data = res['result']['creditHead'];
                        this.newdataSource10.data = res['result']['fileDto'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    totalAmount(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.amount);
        });
        return amountExp;
    }

    totalCreditAmount(): number {
        let amountExp = 0;
        this.newdataSource2.data.forEach(element => {
            amountExp = amountExp + Number(element.amount);
        });
        return amountExp;
    }

    onPressPrint() {
        // let printContents = document.getElementById('content').innerHTML;
        // let originalContents = document.body.innerHTML;
        // document.body.innerHTML = printContents;
        window.print();
        // document.body.innerHTML = originalContents;
    }
}
