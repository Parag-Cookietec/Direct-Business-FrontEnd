import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDirective } from 'src/app/shared/directive/validation.directive';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/models/common-listing';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { MasterEstimateService } from '../../services/master-estimate.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-wma-master',
    templateUrl: './wma-master.component.html',
    styleUrls: ['./wma-master.component.css']
})
export class WmaMasterComponent implements OnInit {
    // Form
    wmaMasterForm: FormGroup;
    // Date
    todayDate = Date.now();
    maxDate = new Date();
    wmaTypeCtrl: FormControl = new FormControl();
    directiveObj = new CommonDirective(this.router);
    errorMessages = dmoMessage;
    isViewOnly;
    wmaTypeList;
    constructor(
        private fb: FormBuilder,
        private storageService: StorageService,
        private toastr: ToastrService,
        private masterEstimateService: MasterEstimateService,
        private router: Router
    ) {}

    ngOnInit() {   
        //  const obj = {
        //     access_token: '99782245-8ab5-43cd-a569-e8fc374cfd8b'
        // };
        // this.storageService.set('currentUser', obj);   
        this.wmaMasterForm = this.fb.group({
            wmaType: [''],
            startFrmDt: [''],
            endToDt: [''],
            wmaLimit: [''],
            wmaRoi: ['']
        });

        this.getwmatype();
    }

    getwmatype() {
        const param = {
            "id" : 420
        };
        const url = 'edp/lulookupinfo/getbyparentlookupid';
        this.masterEstimateService.getYearrage(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);
                    this.wmaTypeList = res['result'];
                    if (this.masterEstimateService.wma_id) {
                        setTimeout(() => {
                            console.log(this.masterEstimateService.wma_data)
                            this.setData(this.masterEstimateService.wma_data);
                        });
                        if (this.masterEstimateService.wma_isView) {
                            this.isViewOnly = this.masterEstimateService.wma_isView;
                        }
                    }
                }
            },
            err => {}
        );
    }

    setData(wma_data) {
        console.log(wma_data);
        this.wmaMasterForm.setValue({
            wmaType: wma_data.wmaType,
            startFrmDt: wma_data.startFrmDt,
            endToDt: wma_data.endToDt,
            wmaLimit: wma_data.wmaLimit,
            wmaRoi: wma_data.wmaRoi
        });        
    }

    

    update() {
        

        const param = {
            wmaType: this.wmaMasterForm.value.wmaType,
            startFrmDt: this.formatDate(this.wmaMasterForm.value.startFrmDt),
            endToDt: this.formatDate(this.wmaMasterForm.value.endToDt),
            wmaLimit: this.wmaMasterForm.value.wmaLimit,
            wmaRoi: this.wmaMasterForm.value.wmaRoi
        };

        // let param = this.wmaMasterForm.value;
        param['id'] = this.masterEstimateService.wma_id;
        const url = 'dmo/wmatype/101';
        this.masterEstimateService.saveBudgetMaster(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        // this.toastr.success(res['message']);
                        this.wmaMasterForm.reset();
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

    save() {
        if (this.masterEstimateService.wma_id) {
            this.update();
            return;
        }
      
        
        const param = {
            wmaType: this.wmaMasterForm.value.wmaType,
            startFrmDt: this.formatDate(this.wmaMasterForm.value.startFrmDt),
            endToDt: this.formatDate(this.wmaMasterForm.value.endToDt),
            wmaLimit: this.wmaMasterForm.value.wmaLimit,
            wmaRoi: this.wmaMasterForm.value.wmaRoi
        };

        // let param = this.wmaMasterForm.value;
        // param.startFrmDt = this.formatDate(this.wmaMasterForm.value.startFrmDt);
        // param.endToDt = this.formatDate(this.wmaMasterForm.value.endToDt);

        const url = 'dmo/wmatype/101';
        this.masterEstimateService.savewmatype(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        // this.toastr.success(res['message']);
                        this.wmaMasterForm.reset();
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

    goToListing() {
        this.router.navigate(['./dashboard/dmo/wma-master-listing']);
    }
}
