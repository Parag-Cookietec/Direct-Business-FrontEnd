import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { dmoMessage } from 'src/app/common/error-message/common-message.constants';
import { CommonListing } from 'src/app/models/common-listing';
import { BudgetLoanEstimateMaster } from 'src/app/models/dmo/dmo';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MasterEstimateService } from '../../services/master-estimate.service';

@Component({
    selector: 'app-budget-loan-estimate-master-listing',
    templateUrl: './budget-loan-estimate-master-listing.component.html',
    styleUrls: ['./budget-loan-estimate-master-listing.component.css']
})
export class BudgetLoanEstimateMasterListingComponent implements OnInit {
    // Formm Group
    budgetLoanEstimateMasterListingForm: FormGroup;

    // Date
    todayDate = Date.now();
    maxDate = new Date();

    errorMessages = dmoMessage;
    directiveObj = new CommonDirective(this.router);

    financialYearCtrl: FormControl = new FormControl();

    financialYearList;

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        // this.dataSource.paginator = mp;
    }

    totalRecords: number = 0;
    pageSize: number = 10;
    pageIndex: number = 0;


    displayedColumns: any[] = [
        'srno',
        'financialYearId',
        'nssfLoanAmt',
        'marketLoanAmt',
        'goiLoanAmt',
        'instituteLoanAmt',
        'action'
    ];

    dataSource;

    constructor(
        private fb: FormBuilder,
        private storageService: StorageService,
        private masterEstimateService: MasterEstimateService,
        public dialog: MatDialog,
        private router: Router
    ) {}
    ngOnInit() {    
   
        this.budgetLoanEstimateMasterListingForm = this.fb.group({
            financialYear: ['']            
        });

        this.getfinancialYear();
        this.search();
        

    }

    // to clear form
    clearForm() {
        this.budgetLoanEstimateMasterListingForm.reset();
    }

    onAdd() {
        this.masterEstimateService.budget_id = null;
        this.masterEstimateService.budget_data = null;
        this.router.navigate(['./dashboard/dmo/budget-loan-master-listing/budget-loan-estimate-master-add']);
    }

    getfinancialYear() {        
        const param = {};
        const url = 'dmo/guarantee/entry/308';
        this.masterEstimateService.getYearrage(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);
                    this.financialYearList = res['result'];
                }
            },
            err => {}
        );
    }

    search(offset = null){            
        const jsonArr = {
            value: this.budgetLoanEstimateMasterListingForm.value.financialYear,
            key : 'dmoMSFinancialYearEntity.financialYearId'
        }
        console.log(jsonArr)
        const param = {
            "pageIndex":offset ? offset : this.pageIndex,
            "pageElement":this.pageSize,
            "sortByColumn":"",
            "sortOrder":"",
            "jsonArr":[    
                
            ]
        };
        if(this.budgetLoanEstimateMasterListingForm.value.financialYear){
            param.jsonArr.push(jsonArr);
        }
        const url = 'dmo/loanestimate/201';
        this.masterEstimateService.getOrgMaster(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.totalRecords = res['result'].totalElement; 
                    this.dataSource= new MatTableDataSource<BudgetLoanEstimateMaster>(res['result'].result);                  
                }
            },
            err => {}
        );
    }
    onEdit(element,viewonly){
        console.log( element.id)
        this.masterEstimateService.budget_id = element.id;
        this.masterEstimateService.budget_data = element;
        if(viewonly){
            this.masterEstimateService.budget_isView = true; 
        }
        this.router.navigate(['./dashboard/dmo/budget-loan-master-listing/budget-loan-estimate-master-add']);
        
    }

    onPaginateChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.search(this.pageIndex)
      }
}
