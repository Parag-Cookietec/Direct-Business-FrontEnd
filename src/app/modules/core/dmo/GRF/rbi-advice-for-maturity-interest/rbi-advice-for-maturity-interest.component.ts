import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonService } from 'src/app/modules/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { GrfcrfService } from '../../services/grfcrf.service';

@Component({
    selector: 'app-rbi-advice-for-maturity-interest',
    templateUrl: './rbi-advice-for-maturity-interest.component.html',
    styleUrls: ['./rbi-advice-for-maturity-interest.component.css']
})
export class RbiAdviceForMaturityInterestComponent implements OnInit {
    transType_List = [];
    secName_List;
    detailsForm: FormGroup;
    transTypeCtrl: FormControl = new FormControl();
    secNameCtrl: FormControl = new FormControl();
    payTypeCtrl: FormControl = new FormControl();
    maxDate = new Date();
    todayDate = Date.now();
    chNoCtrl: FormControl = new FormControl();
    errorMessages = dmoMessage;
    accountType = null;
    showMaturity = false;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private grfcrfService: GrfcrfService,
        private storageService: StorageService,
        private commonService : CommonService
    ) {}

    ngOnInit() {        
        this.detailsForm = this.fb.group({
            transType: [''],
            balGrf: [''],
            rbiAdvNo: [''],
            rbiAdvDate: [''],
            secName: [''],
            trensDate: [''],
            intAmt: [''],
            totAmt: [''],
            progBal: [''],
            maturityAmt: ['']
        });

        this.getAccoutType();
        this.getTypeofTranscation();
        this.getprogPriContriTillDt();
    }


    getprogPriContriTillDt() {
        this.commonService.showLoader();
        const url = 'dmo/grfcrf/progpricontri/301';
        this.grfcrfService.getAccoutType({}, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        this.commonService.removeLoader();
                        console.log(res['result'])
                        this.detailsForm.controls.balGrf.setValue(res['result'].progPriContriTillDt);
                        
                    }
                }
            },
            err => {}
        );
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

    typeOfTransSelected(element) {
        console.log('hiiii', element);
        if (this.detailsForm.value.transType == 1945) {
            this.showMaturity = true;
            console.log(this.detailsForm.get('maturityAmt'));
            // this.detailsForm.get('maturityAmt').setValidators([Validators.required]);
            this.detailsForm.controls['maturityAmt'].setValidators([Validators.required]);
        } else {
            this.detailsForm.controls['maturityAmt'].clearValidators();
            this.showMaturity = false;
        }
        this.detailsForm.controls['maturityAmt'].updateValueAndValidity();
    }

    saveDetails() {
        console.log('saveDrailts call');
        const param = {
            accountType: this.accountType ? this.accountType.name : null,
            accountTypeId: this.accountType ? this.accountType.id : null,
            transactTypeId: this.detailsForm.value.transType,
            rbiAdviceNo: this.detailsForm.value.rbiAdvNo,
            rbiAdviceDt: this.formatDate(this.detailsForm.value.rbiAdvDate),
            currAccBal: this.detailsForm.value.balGrf,
            securityTypeId: this.detailsForm.value.secName,
            transactionDt: this.formatDate(this.detailsForm.value.trensDate),
            interestAmt: this.detailsForm.value.intAmt,
            totalAmount: this.detailsForm.value.totAmt,
            progBalAcc: this.detailsForm.value.progBal,
            maturityAmt: this.detailsForm.value.maturityAmt
        };
        const url = 'dmo/grfcrf/201';
        this.grfcrfService.adviceForAccuredInterest(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        this.toastr.success(res['message']);
                        console.log(res['result']);
                        this.detailsForm.reset();
                        this.showMaturity = false;
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

    getAccoutType() {
        const param = {
            name: 'Types of Loan Account'
        };
        const url = 'dmo/grfcrf/102';
        this.grfcrfService.getAccoutType(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        res['result'].filter(item => {
                            if (item.name == 'GRF') {
                                this.accountType = item;
                                this.getNameOfSecurity();
                            }
                        });
                    }
                }
            },
            err => {}
        );
    }

    getTypeofTranscation() {
        const param = {
            name: 'Interest Type of Transaction'
        };
        const url = 'dmo/grfcrf/102';
        this.grfcrfService.getTypeofTranscation(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        this.transType_List = res['result'];
                    }
                }
            },
            err => {}
        );
    }

    getNameOfSecurity() {
        console.log('hii');
        const param = {
            accountType: this.accountType ? this.accountType.name : null,
            accountTypeId: this.accountType ? this.accountType.id : null
        };
        const url = 'dmo/grfcrf/202';
        this.grfcrfService.getNameSecurity(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        console.log(res['result']);
                        this.secName_List = res['result'];
                    }
                }
            },
            err => {}
        );
    }

    inputChange(){
       
        if(this.detailsForm.value.balGrf && this.detailsForm.value.totAmt){            
            const princiContribu = this.detailsForm.value.balGrf + (+this.detailsForm.value.totAmt);
            this.detailsForm.controls.progBal.setValue(princiContribu);            
        }
              
    }  
}
