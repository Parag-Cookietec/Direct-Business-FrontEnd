import { DataService } from 'src/app/common/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkflowDmoComponent } from '../../../workflow-dmo/workflow-dmo.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { msgConst } from 'src/app/shared/constants/dmo/dmo-msg.constants';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-nssf-loan-received-add-details',
    templateUrl: './nssf-loan-received-add-details.component.html',
    styleUrls: ['./nssf-loan-received-add-details.component.css']
})
export class NssfLoanReceivedAddDetailsComponent implements OnInit, OnDestroy {
    errorMessages = dmoMessage;

    addDetailsForm: FormGroup;
    maxDate = new Date();
    todayDate = Date.now();
    data;
    nssfId: any;
    nssfLoanData: any;
    isViewOnly = false;
    isEditOnly = false;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog,
        private dataService: DataService,
        private route: ActivatedRoute,
        private _nssfLoanService: NssfLoanService,
        private toastr: ToastrService
    ) {
        this.data = this.dataService.getOption();
        this.route.params.subscribe(params => {
            this.nssfId = params.id;
        });
    }

    ngOnInit() {
        //   sanctionNo: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
        console.log(this._nssfLoanService.dpData);
        this.addDetailsForm = this.fb.group({
            sanctionOrderNo: [''],
            sanctionOrderDate: ['', Validators.required],
            loanReceiptDate: ['', Validators.required],
            loanAmount: ['', Validators.required],
            loanTenure: ['', Validators.required],
            moratariumPeriod: ['', Validators.required],
            loanROI: ['', Validators.required],
            prncplInstallYear: ['', Validators.required],
            totalPrncplInstall: ['', Validators.required],
            intrestInstallYear: ['', Validators.required],
            firstInstallDate: ['', Validators.required] // not in payload
        });

        if (this._nssfLoanService.dpData) {
            this.addDetailsForm.setValue({
                sanctionOrderNo: [''],
                sanctionOrderDate: [''],
                loanReceiptDate: [''],
                loanTenure: [''],
                moratariumPeriod: [''],
                loanROI: [''],
                prncplInstallYear: [''],
                totalPrncplInstall: [''],
                intrestInstallYear: [''],
                firstInstallDate: [''],
                loanAmount: this._nssfLoanService.dpData.creditAmt ? this._nssfLoanService.dpData.creditAmt : ['']
            });
        }
        if (this._nssfLoanService.dpid) {
            setTimeout(() => {
                this.setData(this._nssfLoanService.dpData);
            });
            if(this._nssfLoanService.isEdit){            
                this.isEditOnly = this._nssfLoanService.isEdit;
            }
            if (this._nssfLoanService.isView) {
                this.isViewOnly = this._nssfLoanService.isView;
            }
        }
    }

    setData(result) {
        console.log(result);
        this.addDetailsForm.setValue({
            sanctionOrderNo: result.sanctionOrderNo,
            sanctionOrderDate: result.sanctionOrderDate,
            loanReceiptDate: result.loanReceiptDate,
            loanAmount: result.loanAmount,
            loanTenure: result.loanTenure,
            moratariumPeriod: result.moratariumPeriod,
            loanROI: result.loanROI,
            prncplInstallYear: result.prncplInstallYear,
            totalPrncplInstall: result.totalPrncplInstall,
            intrestInstallYear: result.intrestInstallYear,
            firstInstallDate: result.firstInstallDate
        });
    }

    onAddSubmit() {

        if (this.addDetailsForm.value.loanTenure && this.addDetailsForm.value.loanTenure) {                        
            if (
                +this.addDetailsForm.value.moratariumPeriod >
                +this.addDetailsForm.value.loanTenure
            ) {
                this.toastr.error(this.errorMessages.MORATORIUM_MORE);                
                return;
            }             
        } 
        if (this._nssfLoanService.dpid) {
            this.update();
        } else {
            this.onSubmit();
        }
    }

    update(): void {
        const payload = JSON.parse(JSON.stringify(this.addDetailsForm.value));

        payload['firstInstallDate'] = this.formatDate(this.addDetailsForm.value.firstInstallDate);
        payload['loanReceiptDate'] = this.formatDate(this.addDetailsForm.value.loanReceiptDate);
        payload['adviceBy'] = this._nssfLoanService.dpData.adviceBy;
        payload['adviceDate'] = this._nssfLoanService.dpData.adviceDate;
        payload['adviceNo'] = this._nssfLoanService.dpData.adviceNo;
        payload['dpSheetId'] = this._nssfLoanService.dpData.dpSheetId;
        payload['dpSheetRecDate'] = this._nssfLoanService.dpData.dpSheetRecDate;
        payload['isLoanOlder'] = 0;
        payload['id'] = this._nssfLoanService.dpData.id;

        payload['loanStartDate'] = this.formatDate(this.addDetailsForm.value.loanReceiptDate);
        payload['refrenceDate'] = this.addDetailsForm.value.sanctionOrderDate;
        payload['refrenceNo'] = '20-21/DMO/NLR/000113';
        payload['nssfLoanId'] = null;
        payload['loanNumber'] = null;
        payload['memono'] = null;
        payload['transactionDesc'] = null;
        payload['organizationName'] = null;
        payload['loanFinanceYearId'] = 70;
        payload['creditAmount'] = null;
        payload['loanMaturityDate'] = null;
        payload['rateOfInterest'] = 0;

        const url = 'dmo/nssfloanreceived/401';
        this._nssfLoanService.savenssfLoanReceivedDetails(payload, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);
                    this.toastr.success('Nssf loan received updated successfully');
                    this.router.navigate(['./dashboard/dmo/nssf-loan-approved']);
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

    onSubmit(): void {
        const payload = JSON.parse(JSON.stringify(this.addDetailsForm.value));
        payload['firstInstallDate'] = this.formatDate(this.addDetailsForm.value.firstInstallDate);
        payload['loanReceiptDate'] = this.formatDate(this.addDetailsForm.value.loanReceiptDate);
        payload['adviceBy'] = this._nssfLoanService.dpData.adviceBy;
        payload['adviceDate'] = this._nssfLoanService.dpData.adviceDate;
        payload['adviceNo'] = this._nssfLoanService.dpData.adviceNo;
        payload['dpSheetId'] = this._nssfLoanService.dpData.id;

        payload['dpSheetRecDate'] = this._nssfLoanService.dpData.dpSheetReciveDate;
        payload['isLoanOlder'] = 0;
        payload['loanStartDate'] = this.formatDate(this.addDetailsForm.value.loanReceiptDate);
        payload['principalFirstInstallDate'] = this.formatDate(this.addDetailsForm.value.loanReceiptDate);
        payload['refrenceDate'] = this.addDetailsForm.value.sanctionOrderDate;
        payload['refrenceNo'] = 20;

        if (this._nssfLoanService.dpid) {
            payload['id'] = this._nssfLoanService.dpData.id;
        }
        const url = 'dmo/nssfloanreceived/101';
        this._nssfLoanService.savenssfLoanReceivedDetails(payload, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);
                    this.toastr.success('Nssf loan received add details submitted');
                    // this.router.navigate(['./dashboard/dmo/goi/goi-loan-received']);
                    this._nssfLoanService.nssfLoanAddedDetails = res['result'];
                    this.router.navigate(['./dashboard/dmo/loan-repayment-schedule']);
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
    // on

    ngOnDestroy() {}

    onCancel() {
        this._nssfLoanService.setDPData(null);
        if (this.nssfId) {
            this.router.navigate(['/dashboard/dmo/nssf-loan-approved']);
        } else {
            this.router.navigate(['/dashboard/dmo/nssf-loan-received']);
        }
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
