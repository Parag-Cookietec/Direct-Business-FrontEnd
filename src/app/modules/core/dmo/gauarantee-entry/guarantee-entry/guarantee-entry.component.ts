// import { datasource } from './../../../budget/delegation/delegation.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { MatPaginator, MatTableDataSource } from '@angular/material';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonDirective } from 'src/app/shared/directive/validation.directive';
import { CommonListing } from 'src/app/models/common-listing';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from 'src/app/modules/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-guarantee-entry',
    templateUrl: './guarantee-entry.component.html',
    styleUrls: ['./guarantee-entry.component.css']
})
export class GuaranteeEntryComponent implements OnInit {
    selectedIndex: number;
    tabDisable: Boolean = true;
    guaranteeEntryForm: FormGroup;
    addDetailsForm: FormGroup;
    isDetails = false;
    maxDate = new Date();
    todayDate = Date.now();
    errorMessages = dmoMessage;
    departmentNameCreditCtrl: FormControl = new FormControl();
    hodCreditCtrl: FormControl = new FormControl();
    crdtrInstituteNameCtrl: FormControl = new FormControl();
    debitInstituteNameCtrl: FormControl = new FormControl();
    departmentNameDebitCtrl: FormControl = new FormControl();
    hodDebitCtrl: FormControl = new FormControl();
    hodList = [];
    hodList_debitor = [];
    id_counter = 0;
    departmentNameList = [];
    instituteNameList = [];
    instituteNameListdebt = [];
    departmentNameList_debitor = [];
    // table data
    Element_Data: any[] = [];
    currentEditID = null;
    dataSource = new MatTableDataSource<any>(this.Element_Data);
    showUpdateBtn = false;
    showAddBtn = true;
    displayedColumns: any[] = [
        'position',
        'crdtrDeptName',
        'crdtrHodName',
        'crdtrInstituteName',
        'debtrDeptName',
        'debtrHodName',
        'debtrInstituteName',
        'guaranteeAmount',
        'guaranteeTenure',
        'guaranteeFeeRate',
        'action'
    ];

    directiveObj = new CommonDirective();
    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.dataSource.paginator = mp;
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private commanService: CommonService,
        private storageService: StorageService
    ) {}

    ngOnInit() {        
        this.guaranteeEntryForm = this.fb.group({
            departmentNameCredit: [''],
            hodCredit: [''],
            instituteNameCredit: [''],
            departmentNameDebit: [''],
            hodDebit: [''],
            instituteNameDebit: [''],
            amount: [''],
            tenure: [''],
            guaranteeRate: ['']
        });        
        this.getDepartmentList();
        this.getInstituteNameList();
    }

    getDetails() {
        this.isDetails = true;
    }
    onAddDetails() {
        this.router.navigate(['./dmo/nssf-loan-received/add-details']);
    }
    getTabIndex(tabIndex) {        
        this.selectedIndex = tabIndex;
        const temp = this.selectedIndex;
        if (this.selectedIndex == 1) {
            this.setDetailsFormEmpty();            
            this.showUpdateBtn = false;
            this.showAddBtn = true;
        }
    }

    getDepartmentList() {
        const param = {};
        const url = 'dmo/guarantee/entry/302';
        this.commanService.getGuaranteeDropdownValues(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        res['result'].filter(item => {
                            this.departmentNameList = res['result'];
                            this.departmentNameList_debitor = res['result'];
                        });
                    }
                }
            },
            err => {}
        );
    }

    getInstituteNameList() {
        const param = {};
        const url = 'dmo/guarantee/entry/304';
        this.commanService.getGuaranteeDropdownValues(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        res['result'].filter(item => {
                            this.instituteNameList = res['result'];
                            this.instituteNameListdebt = res['result'];                            
                        });
                    }
                }
            },
            err => {}
        );
    }

    onUpdate() {
        this.dataSource.data.forEach(item => {
            if (item.id == this.currentEditID) {
                const index = this.dataSource.data.indexOf(item);
                this.tabDisable = false;
                this.selectedIndex = 1;
                this.dataSource.data[index] = {
                    id: this.currentEditID,
                    crdtrDeptName: this.directiveObj.getViewValueGuarantee(
                        this.departmentNameList,
                        this.guaranteeEntryForm.controls.departmentNameCredit.value
                    ),
                    crdtrDeptId: this.guaranteeEntryForm.controls.departmentNameCredit.value,
                    crdtrHodName: this.directiveObj.getViewValueGuarantee(
                        this.hodList,
                        this.guaranteeEntryForm.controls.hodCredit.value
                    ),
                    crdtrHodId: this.guaranteeEntryForm.controls.hodCredit.value,
                    crdtrInstituteName: this.directiveObj.getViewValueGuarantee(
                        this.instituteNameList,
                        this.guaranteeEntryForm.controls.instituteNameCredit.value
                    ),
                    crdtrInstituteId: this.guaranteeEntryForm.controls.instituteNameCredit.value,
                    debtrDeptName: this.directiveObj.getViewValueGuarantee(
                        this.departmentNameList_debitor,
                        this.guaranteeEntryForm.controls.departmentNameDebit.value
                    ),
                    debtrDeptId: this.guaranteeEntryForm.controls.departmentNameDebit.value,
                    debtrHodName: this.directiveObj.getViewValueGuarantee(
                        this.hodList_debitor,
                        this.guaranteeEntryForm.controls.hodDebit.value
                    ),
                    debtrHodId: this.guaranteeEntryForm.controls.hodDebit.value,
                    debtrInstituteName: this.directiveObj.getViewValueGuarantee(
                        this.instituteNameList,
                        this.guaranteeEntryForm.controls.instituteNameDebit.value
                    ),
                    debtrInstituteId: this.guaranteeEntryForm.controls.instituteNameDebit.value,
                    guaranteeAmount: this.guaranteeEntryForm.controls.amount.value,
                    guaranteeTenure: this.guaranteeEntryForm.controls.tenure.value,
                    guaranteeFeeRate: this.guaranteeEntryForm.controls.guaranteeRate.value
                };

                this.dataSource.data = this.dataSource.data;
            }
        });
    }
    onAdd() {
        this.tabDisable = false;
        this.selectedIndex = 1;
        this.dataSource.data.push({
            id: this.id_counter++,
            crdtrDeptName: this.directiveObj.getViewValueGuarantee(
                this.departmentNameList,
                this.guaranteeEntryForm.controls.departmentNameCredit.value
            ),
            crdtrDeptId: this.guaranteeEntryForm.controls.departmentNameCredit.value,
            crdtrHodName: this.directiveObj.getViewValueGuarantee(
                this.hodList,
                this.guaranteeEntryForm.controls.hodCredit.value
            ),
            crdtrHodId: this.guaranteeEntryForm.controls.hodCredit.value,
            crdtrInstituteName: this.directiveObj.getViewValueGuarantee(
                this.instituteNameList,
                this.guaranteeEntryForm.controls.instituteNameCredit.value
            ),
            crdtrInstituteId: this.guaranteeEntryForm.controls.instituteNameCredit.value,
            debtrDeptName: this.directiveObj.getViewValueGuarantee(
                this.departmentNameList_debitor,
                this.guaranteeEntryForm.controls.departmentNameDebit.value
            ),
            debtrDeptId: this.guaranteeEntryForm.controls.departmentNameDebit.value,
            debtrHodName: this.directiveObj.getViewValueGuarantee(
                this.hodList_debitor,
                this.guaranteeEntryForm.controls.hodDebit.value
            ),
            debtrHodId: this.guaranteeEntryForm.controls.hodDebit.value,
            debtrInstituteName: this.directiveObj.getViewValueGuarantee(
                this.instituteNameList,
                this.guaranteeEntryForm.controls.instituteNameDebit.value
            ),
            debtrInstituteId: this.guaranteeEntryForm.controls.instituteNameDebit.value,
            guaranteeAmount: this.guaranteeEntryForm.controls.amount.value,
            guaranteeTenure: this.guaranteeEntryForm.controls.tenure.value,
            guaranteeFeeRate: this.guaranteeEntryForm.controls.guaranteeRate.value
        });
        this.dataSource.data = this.dataSource.data;
        this.setDetailsFormEmpty();
    }
    onSave() {
        this.router.navigate(['./dmo/nssf-loan-approved']);
    }
    edit(element) {
        this.selectedIndex = 0;
        this.currentEditID = element.id;
        this.showUpdateBtn = true;
        this.showAddBtn = false;
        this.setDataToview(element);
    }

    setDetailsFormEmpty() {
        this.guaranteeEntryForm.reset();        
    }

    setDataToview(element) {
        this.departmentSelected(element.crdtrDeptId);
        this.departmentSelected_debitor(element.debtrDeptId);
        this.guaranteeEntryForm.setValue({
            departmentNameCredit: element.crdtrDeptId,
            hodCredit: element.crdtrHodId,
            instituteNameCredit: element.crdtrInstituteId,
            departmentNameDebit: element.debtrDeptId,
            hodDebit: element.debtrHodId,
            instituteNameDebit: element.debtrInstituteId,
            amount: element.guaranteeAmount,
            tenure: element.guaranteeTenure,
            guaranteeRate: element.guaranteeFeeRate
        });
    }
    delete(i) {
        this.dataSource.data.splice(i, 1);
        this.dataSource.data = this.dataSource.data;
    }
    view(element) {
        this.currentEditID = element.id;
        // this.showUpdateBtn = true;
        this.showAddBtn = false;
        this.selectedIndex = 0;
        this.setDataToview(element);
    }

    departmentSelected_debitor(departmentID) {
        let selectedDept = null;
        this.departmentNameList_debitor.forEach(item => {
            if (item.id == departmentID) {
                selectedDept = item;
            }
        });
        if (selectedDept) {
            this.getHOD_debitor(selectedDept);
        }
    }
    departmentSelected(departmentID) {
        let selectedDept = null;
        this.departmentNameList.forEach(item => {
            if (item.id == departmentID) {
                selectedDept = item;
            }
        });
        if (selectedDept) {
            this.getHOD(selectedDept);
        }
    }

    getHOD(selectedDept) {
        const url = 'dmo/guarantee/entry/303';
        this.commanService.getGuaranteeDropdownValues(selectedDept, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        res['result'].filter(item => {
                            this.hodList = res['result'];
                        });
                    }
                }
            },
            err => {}
        );
    }

    getHOD_debitor(selectedDept) {
        const url = 'dmo/guarantee/entry/303';
        this.commanService.getGuaranteeDropdownValues(selectedDept, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        res['result'].filter(item => {
                            this.hodList_debitor = res['result'];
                        });
                    }
                }
            },
            err => {}
        );
    }

    saveDetails() {
        const param = {
            guaranteeList: this.dataSource.data
        };
        const url = 'dmo/guarantee/entry/301';
        this.commanService.saveGuaranteeEntry(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    if (res['result'] !== null) {
                        this.toastr.success(res['message']);
                        this.dataSource.data = [];
                        this.selectedIndex = 0;
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
}
