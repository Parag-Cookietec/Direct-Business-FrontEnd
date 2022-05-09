import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { ListValue } from 'src/app/models/e-pao/epaoModel';
import { BlockCpinService } from 'src/app/modules/core/e-pao/services/block-cpin/block-cpin.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { CommonWorkflowService } from '../../common/workflow-service/common-workflow.service';
import { ModuleNames } from '../epao-common-workflow-constant/epao-common-workflow.constants';
import { EPAOCommonWorkflowComponent } from '../epao-common-workflow/epao-common-workflow.component';

@Component({
    selector: 'app-block-cpin',
    templateUrl: './block-cpin.component.html',
    styleUrls: ['./block-cpin.component.css']
})
export class BlockCpinComponent implements OnInit {
    // date
    todayDate = Date.now();
    initiatiomdate = new Date();
    maxDate = new Date();
    // variable
    errorMessages = EPOAMessage;
    isSubmitted = false;
    // FormGroup
    blockCpinForm: FormGroup;
    // FormControl
    typeCtrl: FormControl = new FormControl();

    wfRoleIds: any;
    wfRoleCode: any;
    menuId: any;
    linkMenuId: any;
    postId: any;
    userId: any;
    lkPoOffUserId: any;
    officeId: any;
    refNumber: any = '';
    displayedColumns = ['srNo', 'cpin', 'cin', 'status', 'fileNo', 'fileDate', 'amountGovt', 'govtCreditDt'];
    onStatusTableData: any = [];
    dataSource: any = new MatTableDataSource(this.onStatusTableData);

    tableData: any = [];
    datalist = {
        gstinTmpidNo: '',
        partyName:'',
        cpinNo: '',
        cinNo: '',
        cpinDt: '',
        cinDt: '',
        stateCd: '',
        bankCd: '',
        bankRefNum: '',
        fileTypeCd: '',
        paymentModeCd: '',
        scrollNo:'',
        scrollDate:''
    };
    modifiedTableCols = ['desc', 'tax', 'interest', 'fees', 'penalty', 'others', 'rat', 'total'];
    ///modifieddataSource = new MatTableDataSource(this.MODIFIED_DATA);
    modifieddataSource: any = new MatTableDataSource(this.tableData);
    jsonArr: { key: string; value: number }[];
    // List Details
    type_list: ListValue[] = [
        { value: 'CIN', viewValue: 'CIN' },
        { value: 'CPIN', viewValue: 'CPIN' }
    ];
    detailProduct:any;
    visible: boolean = true;
    showBtn: boolean = false;
    saveResult: any;
    challanstatus: boolean;
    status: boolean;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public dialog: MatDialog,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        private commonWorkflowService: CommonWorkflowService,
        private blockCpinService: BlockCpinService
    ) {
        if(this.router.getCurrentNavigation().extras.hasOwnProperty('state')) {
            this.detailProduct = this.router.getCurrentNavigation().extras.state;
            this.visible = this.detailProduct['visible'];
            if(this.detailProduct.hasOwnProperty('showBtn')) {
                this.showBtn = this.detailProduct['showBtn'];
            }
           
        } 
    }

    ngOnInit() {
        this.blockCpinForm = this.fb.group({
            cinNo: [''],
            recordType: ['']
        });
        if(this.visible === false) {
            this.displayDataOnRoute();
        }
        this.getRefNumber();
        this.getCurrentUserDetail();
    }

    getRefNumber() {
        this.blockCpinService.getRefNumber({ moduleName: 'GCS' }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.refNumber = res['result'] ? res['result'] : '19-20/E-PAO/BCPIN/001';
                }
            },
            err => {
                this.toastr.error(err);
            }

        );
    }


    getCurrentUserDetail() {
        this.commonWorkflowService.getCurrentUserDetail().then((res: any) => {
            if (res) {
                console.log(res);
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

    displayDataOnRoute() {
        if(this.detailProduct) {
            let value = {cinNo: '', recordType: '' };
            value['cinNo'] = this.detailProduct['cinNo'];
            value['recordType'] = this.detailProduct['recordType'];
            this.getblockCpinOnSearch(value);
        }
       
    }

    resetListing() {
        this.blockCpinForm.reset();
        this.datalist = {
            gstinTmpidNo: '',
            partyName:'',
            cpinNo: '',
            cinNo: '',
            cpinDt: '',
            cinDt: '',
            stateCd: '',
            bankCd:'',
            bankRefNum: '',
            fileTypeCd: '',
            paymentModeCd: '',
            scrollNo:'',
            scrollDate:''
        };
        this.modifieddataSource = [];
        this.onStatusTableData = [];
        this.dataSource = [];
        this.tableData = [];
    }

    resetStatusData() {
        this.blockCpinForm.reset();
        this.onStatusTableData = [];
        this.dataSource = [];
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

    convertDateOnly(date) {
        if (date !== '' && date !== undefined && date !== null) {
            date = new Date(date);
            return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
        }
        return '';
    }

    blockCpinData(): void {
        this.jsonArr = [
            {
                key: 'activeStatus',
                value: 1
            }
        ];
        const value = this.blockCpinForm.value;
        for (const key in value) {
            if (value[key]) {
                const feild = value[key] instanceof String ? value[key].trim().replace('\t', '') : value[key];
                this.jsonArr.push({
                    key,
                    value: moment.isMoment(feild)
                        ? this.convertDateOnly(feild)
                        : key === 'recordType'
                        ? feild
                        : parseFloat(feild) !== NaN
                        ? parseFloat(feild)
                        : feild
                });
            }
        }
        this.getblockCpinOnSearch(value);
    }

    ////////////////  search call

    getblockCpinOnSearch(value) {

        this.challanstatus = true;

        this.blockCpinService.getBlockCpinOnSearch(value).subscribe(
            res => {
                if (res && res['result'] !== null && res['result'].response === true) {
                    this.datalist = res['result'];
                    this.tableData = [res['result']['dto']][0];
                    this.modifieddataSource = this.tableData;
                    if(this.visible === false) {
                        this.getstatus();
                    }
                } else if (res['message'] === 'Unknown Error Occured. ') {
                    this.toastr.error('No Record Found');
                    this.resetListing();
                } else {
                    this.toastr.error('No Record Found');
                    this.resetListing();
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    getstatus() {

    this.status = true;

        let cpinNo = this.datalist.cpinNo;
        this.blockCpinService.getBlockCpinStatus({ cpinNo }).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.onStatusTableData = [res['result']];
                    this.dataSource = this.onStatusTableData;
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    onSubmit() {
        let data = this.onStatusTableData[0];
        data.recStatus = data.fileStatus;
        data.createService = this.visible ? 1 : 0;
        data["menuId"] = this.linkMenuId;
        this.blockCpinService.saveData(data).subscribe(
            res => {
                // if (res && res['result'] === 'Data Saved Successfully.' && res['status'] === 200) {
                //     this.dataSource.data = [res['result']];
                //     this.dataSource.data = [res['result']];
                //     this.saveResult = res;
                //     this.openWfPopup();
                //     this.toastr.success('Data Saved Successfully.');
                //     this.resetListing();

                // } else if (res['result'] === 'Cpin is already blocked ') {
                //     this.toastr.error(res['result']);
                //     this.resetListing();

                // }else if (res['result'] === 'As CPIN status is PAID, this CPIN can not be blocked.') {
                //     this.toastr.error(res['result']);
                //     this.resetListing();
                // }
                if (res && res['result'] && res['status'] === 200) {
                    this.dataSource.data = [res['result']];
                    this.saveResult = res;
                    this.openWfPopup();
                   // this.toastr.error(res['result']);
                }else if (res && res['status'] === 1005) {
                    this.toastr.error(res['message']);
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    openWfPopup(): void {
        const headerDetails = this.saveResult.result;
                    const headerJson = [
                        { label: 'File Name', value: headerDetails.fileName },
                        { label: 'CIN No', value: headerDetails.cinNo },
                        { label: 'CPIN No', value: headerDetails.cpinNo },
                        { label: 'CPIN Amount', value: headerDetails.cpinAmount },
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
                            headingName: 'Bank Rate Master',
                            headerJson: headerJson,
                            trnId: headerDetails.id,
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
                                menuId: this.menuId, //TODO this is satic for now
                            };

                        // this.wfSubmitDetails(paramsForWf); // TODO need to work on this
                            console.log(paramsForWf);
                        }
                        this.resetListing();
                    });
    }

    // navigation
    navigate(): void {
        this.router.navigate(['/dashboard/e-pao/block-cpin-listing'], { skipLocationChange: true });
    }

    // onSubmitList() {
    //   const dialogRef = this.dialog.open(BlockCpinDialogeComponent, {
    //     width: '1200px',
    //     data: {
    //       pageIndex: 0,
    //       pageElement: 10,
    //       sortByColumn: '',
    //       sortOrder: '',
    //       jsonArr: []
    //     }
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');
    //   });
    // }
}

// @Component({
//   // tslint:disable-next-line:component-selector
//   selector: 'block-cpin-dialoge',
//   templateUrl: 'block-cpin-dialoge.html'
// })
// export class BlockCpinDialogeComponent implements OnInit {
//   constructor(
//     public dialog: MatDialog,
//     private router: Router,
//     private blockCpinService: BlockCpinService,
//     public dialogRef: MatDialogRef<BlockCpinDialogeComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private toastr: ToastrService
//   ) { }
//   directiveObject = new EPaoDirectives(this.router, this.dialog);
//   newdataSource = new MatTableDataSource<any>();
//   newdisplayedColumns: string[] = [
//     'srNo',
//     'fileName',
//     'cinNo',
//     'cpinDt',
//     'cpinNo',
//     'cpinAmount',
//     'refrenceNo'
//   ];

//   vitocancel(): void {
//     this.dialogRef.close();
//   }

//   ngOnInit(): void {
//     this.blockCpinService.getBlockCpinList({
//       pageIndex: 0,
//       pageElement: 10,
//       sortByColumn: '',
//       sortOrder: '',
//       jsonArr: []
//   }).subscribe(
//     res => {
//       if (res && res['result'] && res['status'] === 200) {
//         console.log(res);
//         this.newdataSource = res['result']['result'];
//       }
//     },
//     err => {
//       this.toastr.error(err);
//     }
//   );
//   }
// }
