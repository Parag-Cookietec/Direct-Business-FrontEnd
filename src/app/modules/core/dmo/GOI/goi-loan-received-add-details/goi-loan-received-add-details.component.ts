import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { ListValue } from 'src/app/models/common-grant';
import { CommonService } from 'src/app/modules/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { GoiService } from '../../services/goi.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-goi-loan-received-add-details',
    templateUrl: './goi-loan-received-add-details.component.html',
    styleUrls: ['./goi-loan-received-add-details.component.css']
})
export class GoiLoanReceivedAddDetailsComponent implements OnInit {
    todayDate = new Date();
    errorMessages = dmoMessage;

    goiLoanReceivedAddDetailsForm: FormGroup;
    typeOfLoanCtrl: FormControl = new FormControl();
    backToBackLoanCtrl: FormControl = new FormControl();
    nameOfMinistryCtrl: FormControl = new FormControl();
    loanPurposeCtrl: FormControl = new FormControl();
    planSchemeNameCtrl: FormControl = new FormControl();

    typeOfLoanList = [];
    backToBackLoanList = [];
    departmentNameList = [];
    loanPurposeList = [];
    planSchemeNameList = [];
    dpSheetData;
    isViewOnly = false;
    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private goiService: GoiService,
        private router: Router,
        private storageService: StorageService
    ) {}

    ngOnInit() { 
        // const obj = {
        //     access_token: '2bed6fcf-7d2f-4e20-aa7c-a771b9f79328'
        // };
        // this.storageService.set('currentUser', obj);        
        console.log(this.goiService.dpData);
        this.goiLoanReceivedAddDetailsForm = this.fb.group({
            typeOfLoan: [''],
            backToBackLoan: [''],
            sanctionOrderNo: [''],
            sanctionOrderDate: [''],
            loanStartDate: [''],
            nameOfMinistry: [''],
            loanPurpose: [''],
            planSchemeName: [''],
            loanTenure: [''],
            loanAmount: [''],
            loanROI: [''],
            panelInterest: [''],
            srPageNo: [''],
            demandDateOfReceipt: [''],
            moratariumPeriod: [''],
            moratriumPricipalPerc: [''],
            prncplInstallYear: [''],
            totalPrncplInstall: [''],
            principalFirstInstallDate: [''],
            intrestInstallYear: [''],
            interestFirstInstallDate: ['']
        });
        this.getTypeOfLoan();
        this.getNameOfMinistry();
        this.getLoanPurpose();
        this.getBackToBackLoan();
        this.selectBackToBackLoan();

        if (this.goiService.dpData) {
            this.goiLoanReceivedAddDetailsForm.setValue({
                typeOfLoan: [''],
                backToBackLoan: [''],
                sanctionOrderNo: [''],
                sanctionOrderDate: [''],
                loanStartDate: [''],
                nameOfMinistry: [''],
                loanPurpose: [''],
                planSchemeName: [''],
                loanTenure: [''],
                loanAmount: this.goiService.dpData.creditAmt ? this.goiService.dpData.creditAmt : [''],
                loanROI: [''],
                panelInterest: [''],
                srPageNo: [''],
                demandDateOfReceipt: [''],
                moratariumPeriod: [''],
                moratriumPricipalPerc: [''],
                prncplInstallYear: [''],
                totalPrncplInstall: [''],
                principalFirstInstallDate: [''],
                intrestInstallYear: [''],
                interestFirstInstallDate: ['']
            });
        }
        if (this.goiService.dpid) {
            setTimeout(() => {
                this.setData(this.goiService.dpData);
            });
            if (this.goiService.isView) {
                this.isViewOnly = this.goiService.isView;
            }
        }
    }

    loanPurposeSelected(event){
        console.log(event)

        this.loanPurposeList.filter(item =>{
            if(item.id == event.value){
                console.log('hiii',item.schemeName)
                // this.goiLoanReceivedAddDetailsForm.value.planSchemeName = item.schemeName
                this.goiLoanReceivedAddDetailsForm.controls.planSchemeName.setValue(item.schemeName);
                
            }
        })
    }

    setData(result) {
        console.log(result);
        this.goiLoanReceivedAddDetailsForm.setValue({
            typeOfLoan: result.typeOfLoan,
            backToBackLoan: result.backToBackLoan,
            sanctionOrderNo: result.sanctionOrderNo,
            sanctionOrderDate: result.sanctionOrderDate,
            loanStartDate: result.loanStartDate,
            nameOfMinistry: result.nameOfMinistry,
            loanPurpose: result.loanPurpose,
            planSchemeName: result.planSchemeName,
            loanTenure: result.loanTenure,
            loanAmount: result.loanAmount,
            loanROI: result.loanROI,
            panelInterest: result.panelInterest,
            srPageNo: result.srPageNo,
            demandDateOfReceipt: result.demandDateOfReceipt,
            moratariumPeriod: result.moratariumPeriod,
            moratriumPricipalPerc: result.moratriumPricipalPerc,
            prncplInstallYear: result.prncplInstallYear,
            totalPrncplInstall: result.totalPrncplInstall,
            principalFirstInstallDate: result.principalFirstInstallDate,
            intrestInstallYear: result.intrestInstallYear,
            interestFirstInstallDate: result.interestFirstInstallDate
        });
    }

    onAddSubmit() {


        if (this.goiLoanReceivedAddDetailsForm.value.loanTenure && this.goiLoanReceivedAddDetailsForm.value.loanTenure) {                        
            if (
                +this.goiLoanReceivedAddDetailsForm.value.moratariumPeriod >
                +this.goiLoanReceivedAddDetailsForm.value.loanTenure
            ) {
                this.toastr.error(this.errorMessages.MORATORIUM_MORE);                
                return;
            }             
        } 

        if (this.goiService.dpid) {            
            this.update();
        } else {
            
            this.save();
        }
    }

    checkRange() {
             
    }

    update() {
        const payload = JSON.parse(JSON.stringify(this.goiLoanReceivedAddDetailsForm.value));
        payload['demandDateOfReceipt'] = this.formatDate(this.goiLoanReceivedAddDetailsForm.value.demandDateOfReceipt);
        payload['interestFirstInstallDate'] = this.formatDate(
            this.goiLoanReceivedAddDetailsForm.value.interestFirstInstallDate
        );
        payload['loanStartDate'] = this.formatDate(this.goiLoanReceivedAddDetailsForm.value.loanStartDate);
        payload['principalFirstInstallDate'] = this.formatDate(
            this.goiLoanReceivedAddDetailsForm.value.principalFirstInstallDate
        );
        payload['adviceBy'] = this.goiService.dpData.adviceBy;
        payload['adviceDate'] = this.goiService.dpData.adviceDate;
        payload['adviceNo'] = this.goiService.dpData.adviceNo;
        payload['dpSheetId'] = this.goiService.dpData.id;

        //keys not on UI
        payload['isLoanOlder'] = 0;
        payload['dpSheetRecDate'] = this.goiService.dpData.dpSheetReciveDate;
        payload['firstInstallDate'] = this.formatDate(
            this.goiLoanReceivedAddDetailsForm.value.interestFirstInstallDate
        );
        payload['loanMaturityDate'] = this.formatDate(
            this.goiLoanReceivedAddDetailsForm.value.interestFirstInstallDate
        );
        payload['loanReceiptDate'] = this.goiLoanReceivedAddDetailsForm.value.loanStartDate;
        payload['organizationName'] = this.goiLoanReceivedAddDetailsForm.value.nameOfMinistry;
        payload['refrenceDate'] = this.goiLoanReceivedAddDetailsForm.value.sanctionOrderDate;
        payload['refrenceNo'] = 20;
        payload['transactionDesc'] = this.goiService.dpData.transactionDesc;
        payload['id'] = this.goiService.dpData.id;
        const url = 'dmo/goiloanreceived/401';
        this.goiService.saveGOILoanReceivedDetails(payload, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);
                    this.toastr.success('GOI loan received add details submitted');
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
    save() {
        const payload = JSON.parse(JSON.stringify(this.goiLoanReceivedAddDetailsForm.value));
        payload['demandDateOfReceipt'] = this.formatDate(this.goiLoanReceivedAddDetailsForm.value.demandDateOfReceipt);
        payload['interestFirstInstallDate'] = this.formatDate(
            this.goiLoanReceivedAddDetailsForm.value.interestFirstInstallDate
        );
        payload['loanStartDate'] = this.formatDate(this.goiLoanReceivedAddDetailsForm.value.loanStartDate);
        payload['principalFirstInstallDate'] = this.formatDate(
            this.goiLoanReceivedAddDetailsForm.value.principalFirstInstallDate
        );
        payload['adviceBy'] = this.goiService.dpData.adviceBy;
        payload['adviceDate'] = this.goiService.dpData.adviceDate;
        payload['adviceNo'] = this.goiService.dpData.adviceNo;
        payload['dpSheetId'] = this.goiService.dpData.id;

        //keys not on UI
        payload['isLoanOlder'] = 0;
        payload['dpSheetRecDate'] = this.goiService.dpData.dpSheetReciveDate;
        payload['firstInstallDate'] = this.formatDate(
            this.goiLoanReceivedAddDetailsForm.value.interestFirstInstallDate
        );
        payload['loanMaturityDate'] = this.formatDate(
            this.goiLoanReceivedAddDetailsForm.value.interestFirstInstallDate
        );
        payload['loanReceiptDate'] = this.goiLoanReceivedAddDetailsForm.value.loanStartDate;
        payload['organizationName'] = this.goiLoanReceivedAddDetailsForm.value.nameOfMinistry;
        payload['refrenceDate'] = this.goiLoanReceivedAddDetailsForm.value.sanctionOrderDate;
        payload['refrenceNo'] = 20;
        // payload['sanctionDate'] = this.goiLoanReceivedAddDetailsForm.value.sanctionOrderDate;
        // payload['sanctionNo'] = this.goiLoanReceivedAddDetailsForm.value.sanctionOrderNo;
        payload['transactionDesc'] = this.goiService.dpData.transactionDesc;
        // if(this.goiService.dpid){
        //     payload['id'] = this.goiService.dpData.id;
        // }
        const url = 'dmo/goiloanreceived/101';
        this.goiService.saveGOILoanReceivedDetails(payload, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);
                    this.toastr.success('GOI loan received add details submitted');
                    this.router.navigate(['./dashboard/dmo/goi/goi-loan-received']);
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

    selectBackToBackLoan() {
        const param = {
            id: 414
        };
        const url = 'edp/lulookupinfo/getbyparentlookupid';
        this.goiService.getdropdownValues(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        console.log(res['result']);
                        this.planSchemeNameList = res['result'];
                    }
                }
            },
            err => {}
        );
    }

    getBackToBackLoan() {
        const param = {
            id: 411
        };
        const url = 'edp/lulookupinfo/getbyparentlookupid';
        this.goiService.getdropdownValues(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        console.log(res['result']);
                        this.backToBackLoanList = res['result'];
                    }
                }
            },
            err => {}
        );
    }

    getTypeOfLoan() {
        const param = {
            id: 410
        };
        const url = 'edp/lulookupinfo/getbyparentlookupid';
        this.goiService.getdropdownValues(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        console.log(res['result']);
                        this.typeOfLoanList = res['result'];
                    }
                }
            },
            err => {}
        );
    }

    getNameOfMinistry() {
        const param = {};
        const url = 'dmo/guarantee/entry/302';
        this.goiService.getdropdownValues(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        console.log(res['result']);
                        this.departmentNameList = res['result'];
                    }
                }
            },
            err => {}
        );
    }

    getLoanPurpose() {
        const param = {};
        const url = 'dmo/guarantee/entry/306';
        this.goiService.getdropdownValues(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        console.log(res['result']);
                        this.loanPurposeList = res['result'];
                    }
                }
            },
            err => {}
        );
    }

    onCancelClick() {
        this.goiLoanReceivedAddDetailsForm.reset();
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
}
