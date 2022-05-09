import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { CommonListing } from 'src/app/models/common-listing';
import { GuaranteeOrganizationsMaster } from 'src/app/models/dmo/dmo';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MasterEstimateService } from '../../services/master-estimate.service';

@Component({
    selector: 'app-guarantee-organizations-master-listing',
    templateUrl: './guarantee-organizations-master-listing.component.html',
    styleUrls: ['./guarantee-organizations-master-listing.component.css']
})
export class GuaranteeOrganizationsMasterListingComponent implements OnInit {
    // Formm Group
    guaranteeOrganizationsMasterForm: FormGroup;

    // Date
    todayDate = Date.now();
    maxDate = new Date();
    directiveObj = new CommonDirective(this.router);
    departmentNameCtrl: FormControl = new FormControl();

    departmentNameList;
    
    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.dataSource.paginator = mp;
    }

    totalRecords: number = 0;
    pageSize: number = 10;
    pageIndex: number = 0;

    displayedColumns: any[] = ['srno', 'departmentName', 'organizationName', 'action'];

    dataSource; 

    constructor(
        private fb: FormBuilder,
        private storageService: StorageService,
        private masterEstimateService: MasterEstimateService,
        public dialog: MatDialog,
        private router: Router
    ) {}
    ngOnInit() {        
        this.guaranteeOrganizationsMasterForm = this.fb.group({
            departmentName: ['']
        });

        this.getDepartmentList();    
        this.search();   
    }

    

    // to clear form
    clearForm() {
        this.guaranteeOrganizationsMasterForm.reset();
    }

    onAdd() {
        this.masterEstimateService.guarantee_id = null;
        this.masterEstimateService.guarantee_data = null;
        this.router.navigate(['./dashboard/dmo/guarantee-organizations-master-listing/guarantee-organizations-master-add']);
    }

    getDepartmentList() {        
        const param = {};
        const url = 'dmo/guarantee/entry/302';
        this.masterEstimateService.getYearrage(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);
                    this.departmentNameList = res['result'];
                }
            },
            err => {}
        );
    }
    search(offset = null){            
        const jsonArr = {
            value:this.guaranteeOrganizationsMasterForm.value.departmentName,
            key : 'departmentId'
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
        if(this.guaranteeOrganizationsMasterForm.value.departmentName){
            param.jsonArr.push(jsonArr);
        }
        const url = 'dmo/guarantororg/201';
        this.masterEstimateService.getOrgMaster(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    console.log(res['result']);  
                    this.totalRecords = res['result'].totalElement;
                    this.dataSource= new MatTableDataSource<GuaranteeOrganizationsMaster>(res['result'].result);                  
                }
            },
            err => {}
        );
    }
    onEdit(element,viewonly){
        console.log( element.id)
        this.masterEstimateService.guarantee_id = element.id;
        this.masterEstimateService.guarantee_data = element;
        if(viewonly){
            this.masterEstimateService.isView = true; 
        }
        this.router.navigate(['./dashboard/dmo/guarantee-organizations-master-listing/guarantee-organizations-master-add']);
        
    }

    onPaginateChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.search(this.pageIndex)
    }
}
