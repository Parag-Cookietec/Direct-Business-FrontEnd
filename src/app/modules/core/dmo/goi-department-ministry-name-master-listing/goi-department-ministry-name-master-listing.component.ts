import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';


import { GoiDepartmentMinistryNameMaster } from 'src/app/models/dmo/dmo';
import { NgModule } from '@angular/core';
import { MastersService } from '../services/masters.service';
import { getGoiDepartmentMinistryNameMasterObject } from '../model/masters.data-model';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
  selector: 'app-goi-department-ministry-name-master-listing',
  templateUrl: './goi-department-ministry-name-master-listing.component.html',
  styleUrls: ['./goi-department-ministry-name-master-listing.component.css']
})
export class GoiDepartmentMinistryNameMasterComponent implements OnInit {

 
  // Table data for Market Loan Received Table
  public element_data: GoiDepartmentMinistryNameMaster[] = [];

  // Table Columns for Market Loan Received Table
  displayedColumns: any[] = [
    'position',
    'departmentMinistryName',
    'action'
  ];

  showTable = false;
  deparmentMinistryListingForm: FormGroup;
  todayDate = Date.now();
  dataSource;
  departmentMinistryName="";
  public id="";
  

  // Initialize Paginator
  private paginator: MatPaginator;
  private sort: MatSort;
 

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  totalRecords: number = 0;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    ,private storageService: StorageService
    , private _MastersService: MastersService) { }

  ngOnInit() {   
    this.deparmentMinistryListingForm = this.fb.group({
      departmentMinistryName: [''],
    });
    this.searchDetails();
  }

  // getDetails(reqObj) {
  //   let obj = reqObj ? reqObj : {
  //     "pageIndex": 0,
  //     "pageElement": 20,
  //     "jsonArr": []
  //   };
  //   this._MastersService.fetchGoiDepartmentMinistryNameMasterList(obj).subscribe((res: any) => {
  //     if (res && res.result && res.status === 200) {
  //       this.element_data = [];
  //       const data = res && res.result ? res.result : null;
  //       const {size, totalElement, result, totalPage} = data;
  //       this.totalRecords = totalElement;
  //       this.pageSize = size;
  //       result.forEach(element => {
  //         this.element_data.push(getGoiDepartmentMinistryNameMasterObject(element))
  //       });
  //       this.dataSource = new MatTableDataSource<any>(this.element_data);
  //       this.showTable = true;
  //     }
  //   }, error => {
  //     // Error
  //   })
  // }

  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    // const dpObj = {
    //   "pageIndex": event.pageIndex,
    //   "pageElement": event.pageSize,
    //   "jsonArr": [
        
    //   ]
    // };
    this.searchDetails(this.pageIndex,this.deparmentMinistryListingForm.value.departmentMinistryName);
  }

  // Method to for setting data source attributes
  setDataSourceAttributes() {
    if(this.dataSource){
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

 // to clear form
 clearForm() {
  this.deparmentMinistryListingForm.reset();
  this.searchDetails();
}



searchDetails(offset  = null,departmentMinistryName =null) {
  
  console.log(departmentMinistryName);
  let obj =  {
    "pageIndex": offset ? offset : this.pageIndex,
    "pageElement": this.pageSize,
    "jsonArr": []
  };

  const jsonArr = [];
  if(departmentMinistryName){
    jsonArr.push({ key: "deptMinistryName", value: departmentMinistryName });
  }
  if(jsonArr.length){
    obj.jsonArr = jsonArr;
  }  
  this._MastersService.fetchGoiDepartmentMinistryNameMasterList(obj).subscribe((res: any) => {
    if (res && res.result && res.status === 200) {
      this.element_data = [];
      const data = res && res.result ? res.result : null;
      const {size, totalElement, result, totalPage} = data;
      console.log(res?.result?.result?.length == 0)
      if(res?.result?.result?.length == 0){
        if(this.paginator){
          this.paginator.firstPage();        
        }         
      }
      this.totalRecords = totalElement;
      // this.pageSize = size;
      result.forEach(element => {
        this.element_data.push(getGoiDepartmentMinistryNameMasterObject(element))
        this.id=this.element_data[0]['id'];        
      });
      this.dataSource = new MatTableDataSource<any>(this.element_data);
      this.showTable = true;
    }
  }, error => {
    // Error
  })
}


searchForm()
{
  let {departmentMinistryName} = this;

  //  if(departmentMinistryName==''){
  //   this.getDetails(null);
  //  }
  //  else{
    this.searchDetails(null,departmentMinistryName);
  //  }
  
}


onEdit(element:any) {
  this._MastersService.setId(element.id);
  this._MastersService.setRowData('update'); 
  this._MastersService.setDPData(element);
  this.router.navigate(['dashboard/dmo/goi-department-ministry-name-master-listing/add']);
}

onView(element:any) {
  this._MastersService.setRowData('view'); 
  this._MastersService.setDPData(element);
  this.router.navigate(['dashboard/dmo/goi-department-ministry-name-master-listing/add']);
}

onAdd() {
  this._MastersService.setRowData('add'); 
  this._MastersService.setDPData(null);
  this.router.navigate(['dashboard/dmo/goi-department-ministry-name-master-listing/add']);
}
 

}
