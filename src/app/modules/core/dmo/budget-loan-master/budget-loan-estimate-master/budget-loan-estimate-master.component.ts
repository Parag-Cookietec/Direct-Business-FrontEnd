import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDirective } from 'src/app/shared/directive/validation.directive';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/models/common-listing';
import { MasterEstimateService } from '../../services/master-estimate.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-budget-loan-estimate-master',
    templateUrl: './budget-loan-estimate-master.component.html',
    styleUrls: ['./budget-loan-estimate-master.component.css']
})
export class BudgetLoanEstimateMasterComponent implements OnInit {
    // Form
    budgetLoanEstimateMasterForm: FormGroup;
    // Date
    todayDate = Date.now();
    maxDate = new Date();
    financialYearCtrl: FormControl = new FormControl();
    directiveObj = new CommonDirective(this.router);
    errorMessages = dmoMessage;

    financialYearList;
    isViewOnly = false;
    constructor(
        private fb: FormBuilder,
        private storageService: StorageService,
        private toastr: ToastrService,
        private masterEstimateService: MasterEstimateService,
        private router: Router
    ) {}

    ngOnInit() {    
        this.budgetLoanEstimateMasterForm = this.fb.group({
            financialYearId: [''],
            nssfLoanAmt: [''],
            marketLoanAmt: [''],
            goiLoanAmt: [''],
            instituteLoanAmt: ['']
        });
        this.getfinancialYear();

      
    }

    setData(budget_data) {
        console.log(budget_data)
        this.budgetLoanEstimateMasterForm.setValue({
            financialYearId: budget_data.financialYearId,
            nssfLoanAmt: budget_data.nssfLoanAmt,
            marketLoanAmt: budget_data.marketLoanAmt,
            goiLoanAmt: budget_data.goiLoanAmt,
            instituteLoanAmt: budget_data.instituteLoanAmt
        });
    }

    getfinancialYear() {
        const param = {};
        const url = 'dmo/guarantee/entry/308';
        this.masterEstimateService.getYearrage(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);
                    this.financialYearList = res['result'];
                    if (this.masterEstimateService.budget_id) {
                        setTimeout(() => {
                            this.setData(this.masterEstimateService.budget_data);
                        });
                        if (this.masterEstimateService.budget_isView) {
                            this.isViewOnly = this.masterEstimateService.budget_isView;                
                            console.log('innn',this.isViewOnly)
                        }
                    }
                }
            },
            err => {}
        );
    }
    update() {      
        let param = this.budgetLoanEstimateMasterForm.value;
        param['id'] = this.masterEstimateService.budget_id
        const url = 'dmo/loanestimate/101';
        this.masterEstimateService.saveBudgetMaster(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        // this.toastr.success(res['message']);
                        this.budgetLoanEstimateMasterForm.reset();
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

    save() {
        if (this.masterEstimateService.budget_id) {
            this.update();
            return;
        }      

      
        const url = 'dmo/loanestimate/101';
        this.masterEstimateService.saveGurarnteeOrg(this.budgetLoanEstimateMasterForm.value, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        this.toastr.success(res['message']);
                        this.budgetLoanEstimateMasterForm.reset();
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
    goToListing(){
      this.router.navigate(['./dashboard/dmo/budget-loan-master-listing']);
    }
}
