import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDirective } from 'src/app/shared/directive/validation.directive';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/models/common-listing';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MasterEstimateService } from '../../services/master-estimate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-guarantee-organizations-master',
    templateUrl: './guarantee-organizations-master.component.html',
    styleUrls: ['./guarantee-organizations-master.component.css']
})
export class GuaranteeOrganizationsMasterComponent implements OnInit {
    // Form
    guaranteeOrganizationsMasterForm: FormGroup;
    // Date
    todayDate = Date.now();
    maxDate = new Date();
    departmentNameCtrl: FormControl = new FormControl();
    directiveObj = new CommonDirective(this.router);
    errorMessages = dmoMessage;

    departmentNameList;
    isViewOnly = false;
    constructor(
        private fb: FormBuilder,
        private storageService: StorageService,
        private masterEstimateService: MasterEstimateService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    ngOnInit() {        
        this.guaranteeOrganizationsMasterForm = this.fb.group({
            departmentName: [''],
            nameOfOrganization: ['']
        });
        this.getDepartmentList();

       
    }

    setData(guarantee_data) {
        console.log(guarantee_data);
        this.guaranteeOrganizationsMasterForm.setValue({
            departmentName: guarantee_data.departmentId,
            nameOfOrganization: guarantee_data.organizationName
        });
    }

    getDepartmentList() {
        const param = {};
        const url = 'dmo/guarantee/entry/302';
        this.masterEstimateService.getYearrage(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);
                    this.departmentNameList = res['result'];
                    if (this.masterEstimateService.guarantee_id) {
                        setTimeout(() => {
                            this.setData(this.masterEstimateService.guarantee_data);
                        });
                        if (this.masterEstimateService.isView) {
                            this.isViewOnly = this.masterEstimateService.isView;
                            console.log(this.isViewOnly);
                        }
                    }
                }
            },
            err => {}
        );
    }

    updateGuraranteeOrgMaster() {
        let department_name;
        this.departmentNameList.filter(item => {
            if (item.id == this.guaranteeOrganizationsMasterForm.value.departmentName) {
                department_name = item.name;
            }
        });
        const param = {
            id: this.masterEstimateService.guarantee_id,
            departmentId: this.guaranteeOrganizationsMasterForm.value.departmentName,
            departmentName: department_name,
            organizationName: this.guaranteeOrganizationsMasterForm.value.nameOfOrganization
        };
        const url = 'dmo/guarantororg/101';
        this.masterEstimateService.saveGurarnteeOrg(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        // this.toastr.success(res['message']);
                        this.guaranteeOrganizationsMasterForm.reset();
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

    saveGuraranteeOrgMaster() {
        if (this.masterEstimateService.guarantee_id) {
            this.updateGuraranteeOrgMaster();
            return;
        }
        console.log(this.guaranteeOrganizationsMasterForm.value);
        let department_name;
        this.departmentNameList.filter(item => {
            if (item.id == this.guaranteeOrganizationsMasterForm.value.departmentName) {
                department_name = item.name;
            }
        });

        const param = {
            departmentId: this.guaranteeOrganizationsMasterForm.value.departmentName,
            departmentName: department_name,
            organizationName: this.guaranteeOrganizationsMasterForm.value.nameOfOrganization
        };
        const url = 'dmo/guarantororg/101';
        this.masterEstimateService.saveGurarnteeOrg(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        this.toastr.success(res['message']);
                        this.guaranteeOrganizationsMasterForm.reset();
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

    gotolisting() {
        this.router.navigate(['./dashboard/dmo/guarantee-organizations-master-listing']);
    }
}
