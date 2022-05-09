import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { WmaMaster } from 'src/app/models/dmo/dmo';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MasterEstimateService } from '../../services/master-estimate.service';

@Component({
    selector: 'app-wma-master-lisitng',
    templateUrl: './wma-master-lisitng.component.html',
    styleUrls: ['./wma-master-lisitng.component.css']
})
export class WmaMasterLisitngComponent implements OnInit {
    // Formm Group
    WmaMasterLisitngForm: FormGroup;

    // Date
    todayDate = Date.now();
    maxDate = new Date();

    directiveObj = new CommonDirective(this.router);

    wmaTypeCtrl: FormControl = new FormControl();

    wmaTypeList

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        // this.dataSource.paginator = mp;
    }

    // Table Source

    totalRecords: number = 0;
    pageSize: number = 10;
    pageIndex: number = 0;

    displayedColumns: any[] = ['srno', 'wmaType', 'startFrmDt', 'endToDt', 'wmaLimit', 'wmaRoi', 'action'];

    dataSource;

    constructor(
        private fb: FormBuilder,
        private storageService: StorageService,
        private toastr: ToastrService,
        private masterEstimateService: MasterEstimateService,
        public dialog: MatDialog,
        private router: Router
    ) {}
    ngOnInit() {
    
        //   const obj = {
        //     access_token: '28bcbacb-ad64-4314-9927-14127382d02a'
        // };
        // this.storageService.set('currentUser', obj); 
        this.WmaMasterLisitngForm = this.fb.group({
            wmaType: ['']
        });

        this.getwmatype();
        this.search();
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
                }
            },
            err => {}
        );
    }

    // to clear form
    clearForm() {
        this.WmaMasterLisitngForm.reset();
    }

    onAdd() {
        this.masterEstimateService.wma_data = null
        this.masterEstimateService.wma_id = null
        this.router.navigate(['./dashboard/dmo/wma-master-listing/wma-master-add']);
    }

    getwmatypevalue(id) {
        console.log(id) 
       
    }
    search(offset = null){    
              
        let wmaTypevalue = '';
        if(this.WmaMasterLisitngForm.value.wmaType){
            this.wmaTypeList.filter(item =>{
                if(item.id == this.WmaMasterLisitngForm.value.wmaType){
                    wmaTypevalue = item.codeName
                }
            });
        }
         
        const jsonArr = {
            value:wmaTypevalue,
            key : 'wmaType'
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
        if(this.WmaMasterLisitngForm.value.wmaType){
            param.jsonArr.push(jsonArr);
        }
        const url = 'dmo/wmatype/201';
        this.masterEstimateService.getwmaMaster(param, url).subscribe(
            res => {
                if (res && res['result'] && res['status'] === 200) {
                    this.totalRecords = res['result'].totalElement;
                    this.dataSource= new MatTableDataSource<WmaMaster>(res['result'].result);                  
                }
            },
            err => {}
        );
    }
    onEdit(element,viewonly){
        console.log( element.id)
        this.masterEstimateService.wma_id = element.id;
        this.masterEstimateService.wma_data = element;
        if(viewonly){
            this.masterEstimateService.wma_isView = true; 
        }
        this.router.navigate(['./dashboard/dmo/wma-master-listing/wma-master-add']);
        
    }

    onPaginateChange(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.search(this.pageIndex)
      }
}
