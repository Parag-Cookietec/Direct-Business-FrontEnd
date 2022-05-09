import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EPOAMessage } from 'src/app/common/error-message/common-message.constants';
import { formatDate } from '@angular/common';
import { CommonWorkflowService } from '../../common/workflow-service/common-workflow.service';

import { BankRateMaster } from 'src/app/models/e-pao/epaoModel';
import { EPaoDirectives } from 'src/app/common/directive/epao';
import { BankRateMasterService } from '../services/bank-rate-master/bank-rate-master.service';
import { ToastrService } from 'ngx-toastr';
import { msgConst } from 'src/app/shared/constants/edp/edp-msg.constants';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { EPAOCommonWorkflowComponent } from '../epao-common-workflow/epao-common-workflow.component';
import {
    CommonWfMsg, DataConstant, viewableExtension, previewExtension, ModuleNames
} from '../epao-common-workflow-constant/epao-common-workflow.constants';
import { Subscription } from 'rxjs';
import { ProceedDialogComponent } from '../proceed-dialog/proceed-dialog.component';
import { BlockCpinService } from '../services/block-cpin/block-cpin.service';

@Component({
    selector: 'app-bank-rate-master',
    templateUrl: './bank-rate-master.component.html',
    styleUrls: ['./bank-rate-master.component.css']
})
export class BankRateMasterComponent implements OnInit {
    // formGroup
    bankRateMasterForm: FormGroup;
    // Date
    maxDate = new Date();
    refNumber: any = '';
    initiatiomdate = new Date();


    // Table Source
    bankRateMasterDataSource = new MatTableDataSource<Array<BankRateMaster>>();
    bankRateMasterDisplayedColumns: string[] = [
        'srNo',
        'effectivFromDate',
        'effectivToDate',
        'bankRate',
        'addRated',
        'penRated'
        // 'status'
    ];
    directiveObject = new EPaoDirectives(this.router, this.dialog);
    // Error message
    errorMessages: object;


    wfRoleIds: any;
    wfRoleCode: any;
    menuId: any;
    linkMenuId: any;
    postId: any;
    userId: any;
    lkPoOffUserId: any;
    officeId: any;


    bankMasterId: any;
    saveResult: any;
    mode: any;
    subscribeParams: Subscription;
    action: any;
    status: any;
    hdrId: any;
    isEditable: number = 0;
    refNo: any;
    refDate: any;
    trnStatus: String = '';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private bankRateMasterService: BankRateMasterService,
        private commonWorkflowService: CommonWorkflowService,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        private blockCpinService: BlockCpinService
    ) { }

    ngOnInit(): void {
        this.subscribeParams = this.activatedRoute.params.subscribe(resRoute => {
            this.mode = resRoute.mode;
            this.bankMasterId = resRoute.id;
            this.trnStatus = resRoute.trnStatus;
        })
        this.errorMessages = EPOAMessage;
        this.bankRateMasterData();
        this.getBankRateMasterList();
        if (this.mode == 'edit') {
            this.edit();
        }
        this.getCurrentUserDetail();
        this.getRefNumber();

    }

    getRefNumber() {
        this.blockCpinService.getRefNumber({ moduleName: 'BMS' }).subscribe(
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

    edit() {
        this.bankRateMasterService.getBankRateMaster({ id: this.bankMasterId }).subscribe(
            (res: any) => {
                if (res && res['result'] && res['status'] === 200) {
                    this.bankRateMasterForm.patchValue({ effecativeDate: res.result.effectiveFromDate });
                    this.bankRateMasterForm.patchValue({ bankRate: res.result.bankRate });
                    this.bankRateMasterForm.patchValue({ addRate: res.result.additionalRate });
                    this.bankRateMasterForm.patchValue({ effecativeToDate: res.result.effectiveToDate });
                    this.bankRateMasterForm.patchValue({ panaltyRate: res.result.panaltyRate });
                    this.bankRateMasterForm.patchValue({ status: 'Created' });
                    this.refNo = res.result.referenceNumber;
                    this.refDate = res.result.referenceDate;
                    this.bankMasterId = res.result.id;
                }
            },
            err => {
                this.toastr.error(err);
            }
        );
    }

    bankRateMasterData() {
        this.bankRateMasterForm = this.fb.group({
            addRate: [''],
            effecativeDate: [''],
            bankRate: [''],
            effecativeToDate: [''],
            panaltyRate: [''],
            status: ['']
        });
    }

    getBankRateMasterList(): void {
        this.bankRateMasterService
            .getBankRateMasterList({
                pageIndex: 0,
                pageElement: 10,
                sortByColumn: 'effectiveFromDate',
                sortOrder: 'desc',
                jsonArr: [
                    {
                        key: 'activeStatus',
                        value: 1
                    }
                ]
            })
            .subscribe(
                res => {
                    if (res && res['result'] && res['status'] === 200) {
                        this.bankRateMasterDataSource.data = res['result']['result'];
                    }
                },
                err => {
                    this.toastr.error(err);
                }
            );
    }

    /**
     * @description To convert the date into 'yyyy-MM-dd' format
     * @param date date value
     */
    convertDateOnly(date) {
        if (date !== '' && date !== undefined && date !== null) {
            date = new Date(date);
            return this.datepipe.transform(date, 'yyyy-MM-dd').toString();
        }
        return '';
    }

    resetForm(): void {
        this.bankRateMasterForm.reset();
        Object.keys(this.bankRateMasterForm.controls).forEach(key => {
            this.bankRateMasterForm.controls[key].setErrors(null);
        });
        this.bankMasterId = null;
        this.refNo = null;
        this.refDate = null;
        this.trnStatus = null;
    }

    submitFrom(): void {


        //this.openWfPopup();

        // Actual Bank rate master saving logic

        const value = this.bankRateMasterForm.value;
        const reqParams = {
            bankRate: parseFloat(value.bankRate),
            additionalRate: parseFloat(value.addRate),
            effectiveFromDate: this.convertDateOnly(value.effecativeDate),
            menuId: this.linkMenuId
        };
        if (this.mode === 'edit') {
            reqParams['id'] = this.bankMasterId;
            reqParams['panaltyRate'] = parseFloat(value.panaltyRate);
            reqParams['effectiveToDate'] = this.convertDateOnly(value.effecativeToDate);
            reqParams['referenceNumber'] = this.refNo;
            reqParams['referenceDate'] = this.refDate;
            reqParams['activeStatus'] = 1;
        }
        this.bankRateMasterService.createBankRateMasterList(reqParams).subscribe(
            (res: any) => {
                console.log(res)
                if (res && res['result'] && res['status'] === 200) {
                    //this.resetForm();
                    this.toastr.success('record created successfully');
                    //this.getBankRateMasterList();


                    this.bankMasterId = res.result.id;
                    this.saveResult = res;
                    if (this.trnStatus !== 'Approved') {
                        this.openWfPopup();
                    }
                } else if (res && res['status'] === 1005) {
                    this.toastr.error(res['message']);
                }
                else {
                    this.toastr.error('unabale to create record please try again later');
                }
            },
            err => {
                this.toastr.error(err);
            }
        );


        // END - Actual Bank rate master saving logic


    }



    /**
      * @description open work-flow popup
      */
    openWfPopup() {


        // TODO passing static HDR ID as bank rate master

        // const passData = {
        //     hdrId: 48,
        //     actionStatus: 1
        // };



        const paramsBankRateMasterInfo = {
            id: this.bankMasterId,
            actionStatus: 1
        };

        this.bankRateMasterService.getBankRateMaster(paramsBankRateMasterInfo).subscribe((res: any) => {
            const headerDetails = _.cloneDeep(this.saveResult.result);

            //this.toastr.info('headerDetails.bankRate = ' + headerDetails.bankRate);
            const headerJson = [
                { label: 'Bank Rate', value: headerDetails.bankRate },
                { label: 'Additional Rate', value: headerDetails.additionalRate },
                { label: 'Panalty Rate', value: headerDetails.panaltyRate },
                { label: 'Effective From Date', value: ((headerDetails.effectiveFromDate)?this.datepipe.transform(headerDetails.effectiveFromDate, 'dd-MMM-yyyy').toString():headerDetails.effectiveFromDate) },
                //{ label: 'Effective From Date', value: headerDetails.effectiveFromDate },
                { label: 'Effective To Date', value: ((headerDetails.effectiveToDate)?this.datepipe.transform(headerDetails.effectiveToDate, 'dd-MMM-yyyy').toString():headerDetails.effectiveToDate) },
                //{ label: 'Effective To Date', value: headerDetails.effectiveToDate },
                /* { label: 'Reference Number', value: headerDetails.referenceNumber },
                { label: 'Reference Date', value: headerDetails.referenceDate },
                { label: 'Active Status', value: headerDetails.activeStatus } */

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
                    trnId: paramsBankRateMasterInfo.id,
                    moduleInfo: moduleInfo,
                    refNo: headerDetails.referenceNumber ? headerDetails.referenceNumber : '',
                    refDate: headerDetails.referenceDate ? headerDetails.referenceDate : '',
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
                        menuId: 499, //TODO this is satic for now
                    };
                    this.resetForm();
                    if (this.trnStatus == 'Approved') {
                        this.toastr.success("Approved Successfully");
                    }
                    // this.wfSubmitDetails(paramsForWf); // TODO need to work on this
                    console.log(paramsForWf);
                    this.navigate();
                }
            });
        });
    }

    /**
    * @description submit work-flow popup
    */
    // wfSubmitDetails(params) {
    //     this.locService.locWFClosedSubmitDetails(params).subscribe(res => {
    //         if (res && res['status'] === 200) {
    //             if (!this.referenceNo) {

    //                 const passData = {
    //                     hdrId: this.closeReqHdrId,
    //                     actionStatus: 1
    //                 };
    //                 console.log(passData)
    //                 this.locService.getClosedSubmitActionDetails(passData).subscribe((resp: any) => {
    //                     if (resp && resp.status === 200) {
    //                         const headerDetails = _.cloneDeep(resp.result);

    //                         const dialogRef = this.dialog.open(OkDialogComponent, {
    //                             width: '360px',
    //                             data: MESSAGES.REF_NO + headerDetails.referenceNo
    //                         });
    //                         dialogRef.afterClosed().subscribe(() => {
    //                             this.gotoListing();
    //                         });
    //                     }
    //                 });
    //             } else {
    //                 this.gotoListing();
    //             }
    //         } else {
    //             this.toastr.error(res['message']);
    //         }
    //     });
    // }

    // /*
    // *
    // *history View
    // */
    // historyDialogView(tabname) {
    //     this.tabNameHdrId = tabname + ":" + this.closeReqHdrId
    //     console.log(this.tabNameHdrId, 'tabname + hdr id')
    //     this.directiveObject.historyDialog(this.tabNameHdrId)
    // }


    // /**
    //  * Method Executed on change of Circle
    //  * */
    // onCircle(event) {
    //     Object.keys(this.CircleNameList).forEach(key => {
    //         if (this.CircleNameList[key].value === event.value) {
    //             this.lcOpeningRequestCreateForm.patchValue({
    //                 circleCode: this.CircleNameList[key].code,
    //             });
    //         }
    //     });
    // }
    // /*
    // Language Toggle
    // */

    // setEnglishOnFocusOut() {
    //     SetEnglish();
    // }
    // setLang() {
    //     if (this.currentLang === 'Guj') {
    //         SetEnglish();
    //     } else {
    //         SetGujarati();
    //     }
    // }

    // public toggleLanguage(): void {
    //     if (this.currentLang === 'Eng') {
    //         this.currentLang = 'Guj';
    //         return;
    //     }
    //     this.currentLang = 'Eng';
    // }


    /**
          * @description Method to get CurrentUser Deatils.
          * @returns an object
          */

    getCurrentUserDetail() {
        this.commonWorkflowService.getCurrentUserDetail().then((res: any) => {
            if (res) {
                console.log(res);
                this.wfRoleIds = res.wfRoleId;
                this.wfRoleCode = res.wfRoleCode;
                this.linkMenuId = res.linkMenuId ? res.linkMenuId : this.menuId;
                this.postId = res.postId;
                this.userId = res.userId;
                this.lkPoOffUserId = res.lkPoOffUserId;
                this.officeId = res.officeDetail.officeId;


                // this.getAttachmentList(); //TODO Commented for now

            }
        });
    }


    // navigation
    navigate(): void {
        this.router.navigate(['/dashboard/e-pao/bank-rate-master-listing'], { skipLocationChange: true });
    }

    // View bank rate master dialog
    openView(id: number): void {
        // tslint:disable-next-line: no-use-before-declare
        const dialogRef = this.dialog.open(BankRateMasterDialogeComponent, {
            width: '1200px',
            data: {
                id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
    // edit bank rate master dialog
    openEdit(id: number): void {
        // tslint:disable-next-line: no-use-before-declare
        const dialogRef = this.dialog.open(BankRateMasterEditDialogeComponent, {
            width: '1200px',
            data: {
                id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            result && result['isUpdated'] && this.getBankRateMasterList();
        });
    }

    showDeleteConfirmationPopup(element): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '360px',
            data: msgConst.CONFIRMATION_DIALOG.DELETE
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'yes') {
                const reqParams = element;
                reqParams['activeStatus'] = 0;
                this.bankRateMasterService.updateBankRateMasterList(reqParams).subscribe(
                    res => {
                        if (res && res['result'] && res['status'] === 200) {
                            this.toastr.success('record deleted successfully');
                            this.getBankRateMasterList();
                            dialogRef.close();
                        }
                    },
                    err => {
                        this.toastr.error(err);
                    }
                );
            }
        });
    }

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

// view bank rate master dialog
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'bank-rate-dialoge',
    templateUrl: 'bank-rate-dialoge.html'
})
export class BankRateMasterDialogeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private router: Router,
        public dialogRef: MatDialogRef<BankRateMasterDialogeComponent>,
        private bankRateMasterService: BankRateMasterService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);
    newdataSource = new MatTableDataSource<any>();
    newdisplayedColumns: string[] = [
        'srNo',
        'effectivFromDate',
        'effectivToDate',
        'bankRate',
        'addRated',
        'penRated',
        'status'
    ];
    vitocancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.bankRateMasterService.getBankRateMaster({ id: this.data.id }).subscribe(
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

// edit bank rate master dialog
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'bank-rate-edit-dialoge',
    templateUrl: 'bank-rate-edit-dialoge.html'
})
export class BankRateMasterEditDialogeComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private router: Router,
        public dialogRef: MatDialogRef<BankRateMasterEditDialogeComponent>,
        private bankRateMasterService: BankRateMasterService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService,
        @Inject(LOCALE_ID) private locale: string
    ) { }
    directiveObject = new EPaoDirectives(this.router, this.dialog);
    newdataSource = new MatTableDataSource<any>();
    newdisplayedColumns: string[] = [
        'srNo',
        'effectivFromDate',
        'effectivToDate',
        'bankRate',
        'addRated',
        'penRated',
        'status'
    ];
    maxDate = new Date();

    vitocancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.bankRateMasterService.getBankRateMaster({ id: this.data.id }).subscribe(
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

    updateBankRate() {
        // this.directiveObject.workflowDetails();
        const reqParams = this.newdataSource.data[0];
        reqParams['effectiveFromDate'] = formatDate(reqParams['effectiveFromDate'], 'yyyy-MM-dd', this.locale);
        if (reqParams['effectiveToDate']) {
            reqParams['effectiveToDate'] = formatDate(reqParams['effectiveToDate'], 'yyyy-MM-dd', this.locale);
        }
        reqParams['additionalRate'] = parseFloat(reqParams['additionalRate']);
        reqParams['bankRate'] = parseFloat(reqParams['bankRate']);
        reqParams['panaltyRate'] = parseFloat(reqParams['panaltyRate']);
        this.bankRateMasterService.updateBankRateMasterList(reqParams).subscribe(
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
