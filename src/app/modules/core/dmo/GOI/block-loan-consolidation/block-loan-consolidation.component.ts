import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { ListValue } from 'src/app/model/common-grant';
import { StorageService } from 'src/app/shared/services/storage.service';
import { GoiService } from '../../services/goi.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
    selector: 'app-block-loan-consolidation',
    templateUrl: './block-loan-consolidation.component.html',
    styleUrls: ['./block-loan-consolidation.component.css']
})
export class BlockLoanConsolidationComponent implements OnInit {
    todayDate = new Date();
    errorMessages = dmoMessage;

    goiBlockLoanConsolidationForm: FormGroup;

    departmentNameCtrl: FormControl = new FormControl();
    loanPurposeCtrl: FormControl = new FormControl();
    planSchemeNameCtrl: FormControl = new FormControl();
    financialYearCtrl: FormControl = new FormControl();

    financialYearList;

    departmentNameList;
    loanPurposeList;
    planSchemeNameList;
    dataSource: any;
    displayedColumns: any[] = [
        'position',
        'sanctionOrderNo',
        'loanStartDate',
        'loanReceiptDate',
        'loanAmount',
        'loanTenure',
        'moratariumPeriod',
        'loanROI',
        'action'
    ];
    totalRecords: number = 0;
    pageSize: number = 5;
    pageIndex: number = 0;
    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private goiService: GoiService,
        private router: Router,
        private storageService: StorageService
    ) {}

    ngOnInit() {              
        this.goiBlockLoanConsolidationForm = this.fb.group({
            financialYear: [''],
            departmentName: [''],
            loanPurpose: [''],
            planSchemeName: ['']
        });
        this.getfinancialYear();
        this.getNameOfMinistry();
        this.getLoanPurpose();
        this.getBackToBackLoan();
    }

    loanPurposeSelected(event){
        console.log(event)

        this.loanPurposeList.filter(item =>{
            if(item.id == event.value){
                console.log('hiii',item.schemeName)
                // this.goiLoanReceivedAddDetailsForm.value.planSchemeName = item.schemeName
                this.goiBlockLoanConsolidationForm.controls.planSchemeName.setValue(item.schemeName);
                
            }
        })
    }

    getfinancialYear() {
        const param = {};
        const url = 'dmo/guarantee/entry/308';
        this.goiService.getYearrage(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.financialYearList = res['result'];
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
                        this.loanPurposeList = res['result'];
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
                        this.planSchemeNameList = res['result'];
                    }
                }
            },
            err => {}
        );
    }

    onSearch(offset = null) {
        const param = {
            loanFinanceYearId: this.goiBlockLoanConsolidationForm.value.financialYear,
            loanPurpose: this.goiBlockLoanConsolidationForm.value.departmentName,
            nameOfMinistry: this.goiBlockLoanConsolidationForm.value.loanPurpose,
            planSchemeName: this.goiBlockLoanConsolidationForm.value.planSchemeName
        };
        const url = 'dmo/goiloanreceived/search';
        this.goiService.searchblockLoan(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);
                    this.dataSource = new MatTableDataSource(res['result']);
                }
            },
            err => {}
        );
    }

    onCancelClick() {
        this.goiBlockLoanConsolidationForm.reset();
    }

    onPaginateChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.onSearch(this.pageIndex)
    }

    blockLoan(element) {
        const param = {
            id: element.id
        };
        const url = 'dmo/goiloanreceived/deleteGoi';
        this.goiService.searchblockLoan(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);  
                    this.onSearch()            
                }
            },
            err => {}
        );
    }

    
}
