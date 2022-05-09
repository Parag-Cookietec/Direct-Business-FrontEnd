import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonService } from 'src/app/modules/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CommonListing } from '../../../common/model/common-listing';
import { GrfcrfService } from '../../services/grfcrf.service';

@Component({
    selector: 'app-intimation-for-purchase-sale',
    templateUrl: './intimation-for-purchase-sale.component.html',
    styleUrls: ['./intimation-for-purchase-sale.component.css']
})
export class IntimationForPurchaseSaleComponent implements OnInit {
    transType_List = [];

    chNo_List: CommonListing[] = [
        { value: '1', viewValue: '1' },
        { value: '2', viewValue: '2' }
    ];

    payType_List: CommonListing[] = [
        { value: '1', viewValue: 'Principal' },
        { value: '2', viewValue: 'Interest' }
    ];
    negativeAmount = false;
    accountType = null;
    detailsForm: FormGroup;
    transTypeCtrl: FormControl = new FormControl();
    payTypeCtrl: FormControl = new FormControl();
    maxDate = new Date();
    todayDate = Date.now();
    chNoCtrl: FormControl = new FormControl();
    errorMessages = dmoMessage;
    disableUpdate = true;    
    disableSave = true;
    constructor(
        private fb: FormBuilder,
        private storageService: StorageService,
        private router: Router,
        private toastr: ToastrService,
        private grfcrfService: GrfcrfService,
        public commonService: CommonService,
    ) { }

    ngOnInit() {        
        this.detailsForm = this.fb.group({
            transType: [''],
            intiNo: [''],
            intiDate: [''],
            princiContribu: [''],
            amtInti: [''],
            princiContribuAfter: [''],
            trensDate: ['']
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
                        this.detailsForm.controls.princiContribu.setValue(res['result'].progPriContriTillDt);
                        
                    }
                }
            },
            err => {}
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
                            }
                        });
                    }
                }
            },
            err => { }
        );
    }

    getTypeofTranscation() {
        const param = {
            name: 'Intimation Type of Transaction'
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
            err => { }
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

    saveDetails() {
        const param = {
            accountType: this.accountType ? this.accountType.name : null,
            accountTypeId: this.accountType ? this.accountType.id : null,
            transactTypeId: this.detailsForm.value.transType,
            intimationNo: this.detailsForm.value.intiNo,
            intimationDt: this.formatDate(this.detailsForm.value.intiDate),
            tillDtProgPncpl: this.detailsForm.value.princiContribu,
            intimatedAmt: this.detailsForm.value.amtInti,
            aftThisProgPncpl: this.detailsForm.value.princiContribuAfter,
            transactionDt: this.formatDate(this.detailsForm.value.trensDate)
        };
        const url = 'dmo/grfcrf/100';
        this.grfcrfService.intimationforPurchaseSale(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        console.log(res['result']);
                        this.toastr.success(res['message']);
                    } else {

                    }
                }
            },
            err => {
            }
        );
    }

    onIntimationBlur() {
        this.getIntimationData();
    }
    getIntimationData() {
        const param = {
            accountType: this.accountType ? this.accountType.name : null,
            accountTypeId: this.accountType ? this.accountType.id : null,
            intimationNo: this.detailsForm.value.intiNo
        };
        const url = 'dmo/grfcrf/101';
        this.grfcrfService.getIntimationData(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        console.log(res['result']);
                        const result = res['result'];
                        if(result.intimatedAmt){
                            this.disableUpdate = false;
                            this.disableSave = true;
                            this.setUpdateData(result);
                        }else{
                            this.disableUpdate = true;
                            this.disableSave = false;
                        }
                    }
                }
            },
            err => { }
        );
    }
    setUpdateData(result) {
        console.log(result)

        this.detailsForm.setValue({
            transType: result.transactTypeId,
            intiNo: result.intimationNo,
            intiDate: result.intimationDt,
            princiContribu: result.tillDtProgPncpl,
            amtInti: result.intimatedAmt,
            princiContribuAfter: result.aftThisProgPncpl,
            trensDate: result.transactionDt
        });
    }

    addIfPurchase(){
        if(this.detailsForm.value.transType == 1942) // purchase 
        {
            if(this.detailsForm.value.princiContribu && this.detailsForm.value.amtInti){
                const princiContribu = this.detailsForm.value.princiContribu + (+this.detailsForm.value.amtInti);
                this.detailsForm.controls.princiContribuAfter.setValue(princiContribu);
            }
        }
    }
    minusIfsale(){
        console.log('hii')
        if(this.detailsForm.value.transType == 1943) // sale
        {
            console.log('hii2')
            if(this.detailsForm.value.princiContribu && this.detailsForm.value.amtInti){
                console.log('hii3')                
                const princiContribu = this.detailsForm.value.princiContribu - (+this.detailsForm.value.amtInti);                
                if(princiContribu < 0){                
                    this.disableUpdate = true;
                    this.disableSave =true;
                    this.negativeAmount = true;
                }else{
                    this.disableUpdate = false;
                    this.disableSave = false;
                    this.negativeAmount = false;
                }
                this.detailsForm.controls.princiContribuAfter.setValue(princiContribu);
            }
            
        }else{
            this.negativeAmount = false;
        }
    }
    inputChange(){
       
        this.addIfPurchase();
        this.minusIfsale();        
    } 

    typeOfTransSelected(element) {        
        
        this.addIfPurchase();
        this.minusIfsale();   
    }
}
 