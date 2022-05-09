import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import {
    CreditPrintReport,
    EODCinDetailsReport,
    FilePrintReport,
    GSTFileAccounting,
    VoucherPrintReport,
    VoucherYearPrintReport
} from 'src/app/models/e-pao/epaoModel';
import { GstFileAccountingService } from '../services/gst-file-accounting/gst-file-accounting.service';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import { Console } from 'console';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { CommonWorkflowService } from '../../common/workflow-service/common-workflow.service';
import { ModuleNames } from '../epao-common-workflow-constant/epao-common-workflow.constants';
import { EPAOCommonWorkflowComponent } from '../epao-common-workflow/epao-common-workflow.component';
@Component({
    selector: 'app-gst-file-accounting',
    templateUrl: './gst-file-accounting.component.html',
    styleUrls: ['./gst-file-accounting.component.css']
})
export class GstFileAccountingComponent implements OnInit {

    private paginator: MatPaginator;
    private sort: MatSort;
    form: any;

    wfRoleIds: any;
    wfRoleCode: any;
    linkMenuId: any;
    postId: any;
    userId: any;
    lkPoOffUserId: any;
    officeId: any;
    saveResult: any;

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


    // form group
    gftFileAccountingForm: FormGroup;
    // table source
    gstFileAccDataSource = new MatTableDataSource();
    newdisplayedColumns: string[] = ['srNo', 'fileName', 'fileDate', 'totFileCnt', 'totAmt', 'action'];

    newdisplayedFooterColumns: string[] = ['fileName', 'totFileCnt', 'totAmt', 'action'];
    jsonArr: { key: string; value: number }[];
    data: boolean = false;
    visible: boolean = false;
    showBtn: boolean = false;
    isCheck: boolean = false;
    disableSearch: boolean = false;
    refNumber: any = '';
    voucherid: string;
    newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    detailProduct: any;
    id: string = '';

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        private commonWorkflowService: CommonWorkflowService,
        private gstFileAccountingService: GstFileAccountingService
    ) {
        if (this.router.getCurrentNavigation().extras.hasOwnProperty('state')) {
            this.detailProduct = this.router.getCurrentNavigation().extras.state;
            this.visible = this.detailProduct['visible'];
            this.isCheck = this.detailProduct['isCheck'];
            this.disableSearch = this.detailProduct['disableSearch'];
            this.id = this.detailProduct['id'];
            this.refNumber = this.detailProduct['refNumber'];
            if (this.detailProduct.hasOwnProperty('showBtn')) {
                this.showBtn = this.detailProduct['showBtn'];
            }
        }
    }

    directiveObject = new EPaoDirectives(this.router, this.dialog);
    // error message
    public errorMessages;
    maxDate = new Date();
    currentDayData = { fileName: '', fromDate: '', toDate: '' };
    check: boolean = false;




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

    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.getCurrentUserDetail();
        if(this.refNumber == ''){
            this.getRefNumber();
        }
        
        this.gftFileAccountingForm = this.gftFileAccountingData();
        // this.voucherid = detailproduct of id ? detail produc of if: empty string -> ngoninit
        if (this.isCheck === true) {
            this.displayDataOnRoute();
        } else {
            this.DisplayCurrentDateRecords();
        }
    }

    getCurrentUserDetail() {
        this.commonWorkflowService.getCurrentUserDetail().then((res: any) => {
            if (res) {
                this.wfRoleIds = res.wfRoleId;
                this.wfRoleCode = res.wfRoleCode;
                this.linkMenuId = res.linkMenuId ? res.linkMenuId : res.menuId;
                this.postId = res.postId;
                this.userId = res.userId;
                this.lkPoOffUserId = res.lkPoOffUserId;
                this.officeId = res.officeDetail.officeId;
            }
        });
    }

    getRefNumber() {
        this.gstFileAccountingService.getRefNumber({ moduleName: 'GFAP' }).subscribe(
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

    DisplayCurrentDateRecords() {
        let today = this.datepipe.transform(new Date(), 'yyyy-MM-dd').toString();
        let tomorrow = this.datepipe
            .transform(new Date(this.maxDate.getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
            .toString();
        this.currentDayData = {
            fileName: '',
            fromDate: today,
            toDate: tomorrow
        };
        this.gftFileAccountingListOnSearch(this.currentDayData);
    }


    displayDataOnRoute() {
        if (this.detailProduct) {
            let value = { fromDate: '', toDate: '', fileName: '' };
            value['fileName'] = this.detailProduct['fileName'];
            // value['id'] = this.detailProduct['id'];
            this.gftFileAccountingListOnSearch(value);
            
        }

    }

    getFileSummary() {
        const dialogRef = this.dialog.open(GstFileSummaryDialogeComponent, {
            width: '1200px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
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


    onSubmit() {

        if (!this.directiveObject.selection.hasValue()) {
            this.toastr.error('Please select file');
            this.directiveObject.selection.clear();
        }else if (this.directiveObject.selection.selected.length > 1) {
            this.toastr.error('Please select files of same date');
            this.directiveObject.selection.clear();
        } else {
            if (this.id === '') {
                let name = this.directiveObject.selection['_selected'][0].fileName;
                let date = this.directiveObject.selection['_selected'][0].fileDate;
                this.gstFileAccountingService.VoucherGeneration({ fileName: name, fileDate: date, menuId: this.linkMenuId }).subscribe(
                    res => {
                        if (res && res['result'] && res['status'] === 200) {
                            if (res['message'] === ' Voucher is already created for this file!!!') {
                                this.toastr.error(' Voucher is already created for this file');
                                this.directiveObject.selection.clear();
                                this.gftFileAccountingForm.reset({
                                    "id": ""
                                });
                            } else if (res['message'] === ' Voucher Created SuccessFully!!') {
                                this.toastr.success('Voucher Created SuccessFully');
                                this.directiveObject.selection.clear();
                                this.resetForm();
                            }
                            this.saveResult = res;
                            this.openWfPopup();
                        }
                    },
                    err => {
                        this.toastr.error(err);
                    }
                );
            } else {
                let name = this.directiveObject.selection['_selected'][0].fileName;
                this.gstFileAccountingService.getGstFileAccListOnEdit({ fileName: name, id: this.id, menuId: this.linkMenuId }).subscribe(
                    res => {
                        if (res && res['result'] && res['status'] === 200) {
                            if (res['message'] === ' Voucher is already created for this file!!!') {
                                this.toastr.error(' Voucher is already created for this file');
                            } else if (res['message'] === ' Voucher Created SuccessFully!!') {
                                this.toastr.success('Voucher Created SuccessFully');
                            }
                            this.saveResult = res;
                            this.openWfPopup();
                        }
                    },
                    err => {
                        this.toastr.error(err);
                    }
                );
            }

        }
    }

    openWfPopup(): void {
        const headerDetails = this.saveResult.result;
                    const headerJson = [
                        //{ label: 'Voucher No', value: headerDetails.voucherNo },
                        { label: 'Challan Date', value: ((headerDetails.challanDt)?this.datepipe.transform(headerDetails.challanDt, 'dd-MMM-yyyy').toString():headerDetails.challanDt) },
                        //{ label: 'Challan Date', value: headerDetails.challanDt },
                        { label: 'Total Challan Amount', value: headerDetails.totChallanAmt }
                    ];
                    const moduleInfo = {
                        moduleName: ModuleNames.EPAO,
                        tbudSceHdrId: 1,
                        financialYearId: 1,
                        trnRefNo: 1,
                        departmentId: 1,
                        estimationFrom: 1,
                        demandId: 1,
                        bpnI: 1,
                        majorheadId: 1,
                        isRevenueCapital: 1,
                        submajorheadId: 1,
                        minorheadId: 1,
                        subheadId: 1,
                        detailheadId: 1,
                        isChargedVoted: 1,
                        proposed_Amount: 1000,
                        officeTypeId: 1,
                        workflowId: 1,
                        wfRoleId: 1,
                        statusId: 1
                    };
                    const dialogRef = this.dialog.open(EPAOCommonWorkflowComponent, {
                        width: '2700px',
                        height: '600px',
                        data: {
                            menuModuleName: 'gst',
                            headingName: 'GST File Accounting',
                            headerJson: headerJson,
                            trnId: headerDetails.fileAccountingProcessedId?headerDetails.fileAccountingProcessedId:headerDetails.id,
                            moduleInfo: moduleInfo,
                            refNo: headerDetails.referenceNo ? headerDetails.referenceNo : '',
                            refDate: headerDetails.referenceDt ? headerDetails.referenceDt : '',
                            //conditionUrl: 'loc1/accCloseReq/2001', // TODO NEED TO CHANGE THIS
                            isAttachmentTab: false, // for Attachment tab visible it should be true
                        }
                    });
    
                    dialogRef.afterClosed().subscribe(wfData => {
                        if (wfData.commonModelStatus === true) {
                            const popUpRes = wfData.data.result[0];
                            const paramsForWf = {
                                trnId: popUpRes.trnId,
                                wfId: popUpRes.wfId,
                                assignByWfRoleId: popUpRes.assignByWfRoleId,
                                trnStatus: popUpRes.trnStatus,
                                assignToWfRoleId: popUpRes.assignToWfRoleId,
                                assignByBranchId: popUpRes.assignByBranchId,
                                wfActionId: popUpRes.wfActionId,
                                assignByOfficeId: popUpRes.assignByOfficeId,
                                assignToOfficeId: popUpRes.assignToOfficeId,
                                assignToPouId: popUpRes.assignToPouId,
                                menuId: this.linkMenuId, //TODO this is satic for now
                            };
    
                        // this.wfSubmitDetails(paramsForWf); // TODO need to work on this
                            console.log(paramsForWf);
                            this.directiveObject.selection.clear();
                            this.resetForm();
                        }
                    });
      }

    gftFileAccountingData() {
        return this.fb.group({
            fromDate: [''],
            toDate: [''],
            fileName: ['']
        });
    }

    convertDateOnly(date) {
        if (date !== '' && date !== undefined && date !== null) {
            date = new Date(date);
            return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
        }
        return '';
    }

    listingData(): void {
        this.jsonArr = [
            {
                key: 'activeStatus',
                value: 1
            }
        ];
        const value = this.gftFileAccountingForm.value;
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

    gftFileAccountingListOnSearch(value) {
        this.gstFileAccountingService.getGstDataOnSearch(value).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.gstFileAccDataSource.data = res['result'];
                    if(this.detailProduct){
                        if(this.gstFileAccDataSource.data.length > 0){
                            this.gstFileAccDataSource.data.forEach((row: any)=>{
                                this.directiveObject.selection.toggle(row)
                            })
                            
                        }
                    }
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    gstFileAccountingList() {
        this.gstFileAccountingService
            .getGstAccountingList({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.gstFileAccDataSource.data = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    onPressPrint(content) {
        let printContents = document.getElementById(content).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    resetForm(): void {
        this.gftFileAccountingForm.reset();
        this.DisplayCurrentDateRecords();
    }

    openView(cpinDt: any, check: boolean): void {
        check = false;
        cpinDt = this.datepipe.transform(cpinDt, 'yyyy-MM-dd').toString();
        const dialogRef = this.dialog.open(GstFileAccountingDialogeComponent, {
            width: '1200px',
            data: {
                cpinDt,
                check
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    onClickVoucherList() {
        const dialogRef = this.dialog.open(GstFileVoucherDialogeComponent, {
            width: '1200px',
            data: {
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    onClickPrint(cpinDt: any, check: boolean) {
        check = true;
        cpinDt = this.datepipe.transform(cpinDt, 'yyyy-MM-dd').toString();
        const dialogRef = this.dialog.open(GstFileAccountingDialogeComponent, {
            width: '1200px',
            data: {
                cpinDt,
                check
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    // navigation
    navigate(): void {
        this.router.navigate(['/dashboard/e-pao/gst-file-accounting-listing'], { skipLocationChange: true });
    }
}

// view  dialog
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'gst-file-accounting-dialoge',
    templateUrl: 'gst-file-accounting-dialoge.html'
})
export class GstFileAccountingDialogeComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private router: Router,
        public dialogRef: MatDialogRef<GstFileAccountingDialogeComponent>,
        private gstFileAccountingService: GstFileAccountingService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);

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

    newdataSource = new MatTableDataSource<any>();
    newdataSource1 = new MatTableDataSource<any>();
    newdisplayedColumns: string[] = [
        'srNo',
        'gstin',
        'cin',
        'paymentDate',
        'bankCD',
        'sgstTax',
        'sgstIntr',
        'sgstFee',
        'sgstPenalty',
        'sgstOther',
        'sgstTotal',
        'fileDate'
    ];
    newdisplayedFooterColumns: string[] = [
        'srNo',
        'sgstTax',
        'sgstIntr',
        'sgstFee',
        'sgstPenalty',
        'sgstOther',
        'sgstTotal',
        'fileDate'];

    vitocancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.gstFileAccountingService.getEODCinReport({ cpinDt: this.data.cpinDt }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.newdataSource.data = res['result'];
                    setTimeout(()=>{
                        if(this.data.check){
                            window.print();
                        }
                    },1000);
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    totalSgstTax(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.eodCinFileData[0].sgstTax);
        });
        return amountExp;
    }

    totalSgstIntr(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.eodCinFileData[0].sgstIntr);
        });
        return amountExp;
    }

    totalSgstFee(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.eodCinFileData[0].sgstFee);
        });
        return amountExp;
    }

    totalSgstPenalty(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.eodCinFileData[0].sgstPenalty);
        });
        return amountExp;
    }

    totalSgstOth(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.eodCinFileData[0].sgstOth);
        });
        return amountExp;
    }


    totalSgstTotal(): number {
        let amountExp = 0;
        this.newdataSource.data.forEach(element => {
            amountExp = amountExp + Number(element.eodCinFileData[0].sgstTotal);
        });
        return amountExp;
    }

    onPressPrint() {
        //let printContents, popupWin;
        //     printContents = document.getElementById(content).innerHTML;
        //     popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        //     popupWin.document.open();
        //     popupWin.document.write(`
        //   <html>
        //     <head>
        //       <title>Print tab</title>
        //       <style>
        //       color: red
        //       </style>
        //     </head>
        // <body onload="window.print();window.close()">${printContents}</body>
        //   </html>`);
        //     popupWin.document.close();
        // const printContent = document.getElementById(divName);
        // const WindowPrt = window.open();
        // WindowPrt.document.write(printContent.innerHTML);
        // WindowPrt.document.close();
        // WindowPrt.focus();
        // WindowPrt.print();
        // WindowPrt.close();
        // let url = '';
        // let closeWindow = true;
        // const printData = '<html>' + document.getElementById(divName).innerHTML;
        // '</html><script> setTimeout(function () { window.print(); }, 300); setTimeout(function () { window.close(); }, 500);</script>';
        // if (printData) {
        //     const windowfeatures = `height=900,width=800,left=0,top=0,fullscreen=yes,dependent=no,alwaysOnTop=yes`;
        //     const retwin = window.open(url, '_blank', windowfeatures);
        //     if (retwin) {
        //         const doc = retwin.document;
        //         doc.open();
        //         doc.write(printData);
        //         if (closeWindow) {
        //             doc.close();
        //         }
        //     } else {
        //         alert('Unable to open new window, please check popup blockers.');
        //     }
        //     return retwin;
        // } else {
        //     console.log('No HTML Content provided');
        // }
        //window.print();
        // var prtContent = document.getElementById(divName);
        // var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        // WinPrint.document.write(
        //     '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" media="print">'
        // );
        // // To keep styling
        // /*var file = WinPrint.document.createElement("link");
        // file.setAttribute("rel", "stylesheet");
        // file.setAttribute("type", "text/css");
        // file.setAttribute("href", 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
        // WinPrint.document.head.appendChild(file);*/
        // WinPrint.document.write(prtContent.innerHTML);
        // WinPrint.document.close();
        // WinPrint.setTimeout(function() {
        //     WinPrint.focus();
        //     WinPrint.print();
        //     WinPrint.close();
        // }, 1000);
    }
}

/////view dialog file summmary

// view  dialog
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'gst-file-summary-dialoge',
    templateUrl: 'gst-file-summary-dialoge.html'
})
export class GstFileSummaryDialogeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private router: Router,
        public dialogRef: MatDialogRef<GstFileSummaryDialogeComponent>,
        private gstFileAccountingService: GstFileAccountingService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);
    newdataSource = new MatTableDataSource<any>();
    newdisplayedColumns: string[] = [
        'srNo',
        'fileName',
        'fileDate',
        'totFileCnt',
        'sgstAmt',
        'igstAmt',
        'cgstAmt',
        'cessAmt',
        'totAmt'
    ];

    vitocancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.gstFileAccountingService.fileSummaryList({ fileNames: this.data.name }).subscribe(
        //   res => {
        //     if (res && res['result'] && res['status'] === 200) {
        //       this.newdataSource = res['result'];
        //     }
        //   },
        //   err => {
        //     this.toastr.error(err);
        //   }
        // );
    }
}

// voucher list

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'gst-file-voucher-dialoge',
    templateUrl: 'gst-file-voucher-dialoge.html'
})
export class GstFileVoucherDialogeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private router: Router,
        public dialogRef: MatDialogRef<GstFileVoucherDialogeComponent>,
        private gstFileAccountingService: GstFileAccountingService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);
    newdataSource = new MatTableDataSource<any>();
    newdisplayedColumns: string[] = ['srNo', 'fileName', 'fileDate', 'totFileCnt'];

    vitocancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.gstFileAccountingService
            .voucherListing({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: '',
                sortOrder: '',
                jsonArr: []
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.newdataSource = res['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }
}

// voucher dialoge

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'voucher-print-dialoge',
    templateUrl: 'voucher-print-dialoge.html'
})
export class VoucherPrintDialogeComponent implements OnInit {
    ELEMENT_DATA: VoucherPrintReport[] = [
        {
            dh: '8658-00-108-01-02-0000',
            desc: 'RESERVE BANK OF INDIA, PAD',
            txn: '8675-00-123',
            amt: '100'
        },
        {
            dh: '8658-00-108-01-03-0000',
            desc: 'ANDHRA BANK',
            txn: '8675-00-123',
            amt: '100'
        },
        {
            dh: '8658-00-108-01-04-0000',
            desc: 'BANK OF BARODA ',
            txn: '8675-00-123',
            amt: '100'
        },
        {
            dh: '8658-00-108-01-05-0000',
            desc: 'DENA BANK',
            txn: '8675-00-123',
            amt: '100'
        }
    ];

    CERDIT_DATA: CreditPrintReport[] = [
        {
            ch: '0006-00-101-01-00-0000',
            cdesc: 'STATE GOODS AND SERVICES TAX(SGST) TAX',
            ctxn: '',
            camt: ''
        },
        {
            ch: '0006-00-102-01-00-0000',
            cdesc: 'STATE GOODS AND SERVICES TAX(SGST) INTEREST',
            ctxn: '',
            camt: ''
        },
        {
            ch: '0006-00-103-01-00-0000',
            cdesc: 'STATE GOODS AND SERVICES TAX(SGST) PENALTY',
            ctxn: ' ',
            camt: ''
        }
    ];

    FILE_DATA: FilePrintReport[] = [
        {
            fileNo: '',
            ftxn: '',
            fdt: '',
            famt: ''
        },
        {
            fileNo: '0006-00-101-01-00-0000',
            ftxn: 'STATE GOODS AND SERVICES TAX(SGST) TAX',
            fdt: '',
            famt: ''
        },
        {
            fileNo: '0006-00-101-01-00-0000',
            ftxn: 'STATE GOODS AND SERVICES TAX(SGST) TAX',
            fdt: '',
            famt: ''
        }
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

    // table source
    newdataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    newdisplayedColumns: string[] = ['dh', 'desc', 'txn', 'amt'];
    newdisplayedColumns1: string[] = ['1', '2', '3', '4'];
    newdisplayedFooterColumns: string[] = ['dh', 'desc', 'txn', 'amt'];

    // credit table source
    newdataSource2 = new MatTableDataSource<any>(this.CERDIT_DATA);
    newdisplayedColumns2: string[] = ['ch', 'cdesc', 'ctxn', 'camt'];
    newdisplayedColumns3: string[] = ['1', '2', '3', '4'];
    newdisplayedFooterColumns1: string[] = ['ch', 'cdesc', 'ctxn', 'camt'];
    // File table data source
    newdataSource10 = new MatTableDataSource<any>(this.FILE_DATA);
    newdisplayedColumns11: string[] = ['srNo', 'fileNo', 'ftxn', 'fdt', 'famt'];
    newdisplayedColumns12: string[] = ['1', '2', '3', '4', '5'];
    newdisplayedFooterColumns2: string[] = ['srNo', 'fileNo', 'ftxn', 'fdt', 'famt'];

    // voucher table data sources
    newdataSource20 = new MatTableDataSource<any>(this.VOUCHER_DATA);
    newdisplayedColumns21: string[] = ['voucherNo', 'yymmxxx', 'vdt', 'vyear'];
    newdisplayedColumns22: string[] = ['1', '2', '3', '4'];
    newdisplayedFooterColumns3: string[] = ['voucherNo', 'yymmxxx', 'vdt', 'vyear'];

    constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

    directiveObject = new EPaoDirectives(this.router, this.dialog);

    ngOnInit() {
        this.errorMessages = EPOAMessage;
        this.voucherPrintForm = this.manualAccReportData();
    }

    manualAccReportData() {
        return this.fb.group({
            fromDate: [''],
            toDate: ['']
        });
    }
}
