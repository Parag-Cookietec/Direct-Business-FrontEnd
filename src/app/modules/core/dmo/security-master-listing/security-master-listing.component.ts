import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { SecurityMasterListing } from 'src/app/models/dmo/dmo';
import { MastersService } from '../services/masters.service';
import { getSecurityMasterObject } from '../model/masters.data-model';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
  selector: 'app-security-master-listing',
  templateUrl: './security-master-listing.component.html',
  styleUrls: ['./security-master-listing.component.css']
})
export class SecurityMasterListingComponent implements OnInit {

  
  // Table data for Market Loan Received Table
  public element_data: SecurityMasterListing[] = [];

  // Table Columns for Market Loan Received Table
  displayedColumns: any[] = [
    'position',
    'nameOfSecurity',
    'action'
  ];

  showTable = false;
  securityMasterListingForm: FormGroup;
  todayDate = Date.now();
  dataSource;
  nameOfSecurity="";
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
    this.securityMasterListingForm = this.fb.group({
      nameOfSecurity: [''],
     
    });
    this.searchDetails();
  }

  // getDetails(reqObj) {
  //   let obj = reqObj ? reqObj : {
  //     "pageIndex": 0,
  //     "pageElement": 20,
  //     "jsonArr": []
  //   };
  //   this._MastersService.fetchSecurityMasterList(obj).subscribe((res: any) => {
  //     if (res && res.result && res.status === 200) {
  //       this.element_data = [];
  //       const data = res && res.result ? res.result : null;
  //       const {size, totalElement, result, totalPage} = data;
  //       this.totalRecords = totalElement;
  //       this.pageSize = size;
  //       result.forEach(element => {
  //         this.element_data.push(getSecurityMasterObject(element))
          
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
    this.searchDetails(this.pageIndex,this.securityMasterListingForm.value.nameOfSecurity);
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
  this.securityMasterListingForm.reset();
  this.searchDetails();
}



searchDetails(offset = null,nameOfSecurity = null) {
  
  console.log(nameOfSecurity);
  let obj = {
    "pageIndex": offset ? offset : this.pageIndex,
    "pageElement": 10,
    "jsonArr": []
  };

  const jsonArr = [];

  if(nameOfSecurity){
    jsonArr.push({ key: "securityName", value: nameOfSecurity });
  }

  if(jsonArr.length){
    obj.jsonArr = jsonArr;
  }  
  this._MastersService.fetchSecurityMasterList(obj).subscribe((res: any) => {
    if (res && res.result && res.status === 200) {
      this.element_data = [];
      const data = res && res.result ? res.result : null;
      if(res?.result?.result?.length == 0){        
        if(this.paginator){
          this.paginator.firstPage();        
        }         
      }
      const {size, totalElement, result, totalPage} = data;
      this.totalRecords = totalElement;
      // this.pageSize = size;
      result.forEach(element => {
        this.element_data.push(getSecurityMasterObject(element))
        //console.log(this.element_data[0].id);
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
  
  let {nameOfSecurity} = this;

  //  if(nameOfSecurity=='' ){
  //   this.getDetails(null);
  //  }
  //  else{
    this.searchDetails(null,nameOfSecurity);
   
  //  }
  
}


onEdit(element:any) {
 
 this._MastersService.setId(element.id);
 this._MastersService.setRowData('update'); 
 this._MastersService.setDPData(element.nameOfSecurity);
 this.router.navigate(['dashboard/dmo/security-master-listing/add']);

}

onView(element:any) {
  // console.log(element.nameOfSecurity);
  this._MastersService.setRowData('view');
  this._MastersService.setDPData(element.nameOfSecurity);
  this.router.navigate(['dashboard/dmo/security-master-listing/add']);
  
 }

onAddAdviceMaster() {
  console.log(this.securityMasterListingForm.getRawValue());
  this.router.navigate(['dashboard/dmo/security-master-listing/add']);
}
 

}
