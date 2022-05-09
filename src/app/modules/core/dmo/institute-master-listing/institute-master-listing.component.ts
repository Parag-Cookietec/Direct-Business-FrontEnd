import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { InstituteMaster } from 'src/app/models/dmo/dmo';
import { NgModule } from '@angular/core';
import { MastersService } from '../services/masters.service';
import { getInstituteMasterObject } from '../model/masters.data-model';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
  selector: 'app-institute-master-listing',
  templateUrl: './institute-master-listing.component.html',
  styleUrls: ['./institute-master-listing.component.css']
})
export class InstituteMasterListingComponent implements OnInit {

 
  // Table data for Market Loan Received Table
  public element_data: InstituteMaster[] = [];

  // Table Columns for Market Loan Received Table
  displayedColumns: any[] = [
    'position',
    'nameOfinstitute',
    'action'
  ];

  showTable = false;
  instituteMasterListingForm: FormGroup;
  todayDate = Date.now();
  dataSource;
  nameOfinstitute="";
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
    
    this.instituteMasterListingForm = this.fb.group({
      nameOfinstitute: [''],
     
    });
    this.searchDetails();
  }

  // getDetails(reqObj) {
  //   let obj = reqObj ? reqObj : {
  //     "pageIndex": 0,
  //     "pageElement": 20,
  //     "jsonArr": []
  //   };
  //   this._MastersService.fetchInstituteMasterList(obj).subscribe((res: any) => {
  //     if (res && res.result && res.status === 200) {
  //       this.element_data = [];
  //       const data = res && res.result ? res.result : null;
  //       const {size, totalElement, result, totalPage} = data;
  //       this.totalRecords = totalElement;
  //       this.pageSize = size;
  //       result.forEach(element => {
  //         this.element_data.push(getInstituteMasterObject(element))
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
    this.searchDetails(this.pageIndex,this.instituteMasterListingForm.value.nameOfinstitute);
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
  this.instituteMasterListingForm.reset();
  this.searchDetails();
}



searchDetails(offset = null,nameOfinstitute = null) {
  
  console.log(nameOfinstitute);
  let obj = {
    "pageIndex": offset ? offset : this.pageIndex,
    "pageElement": 10,
    "jsonArr": []
  };

  const jsonArr = [];
  if(nameOfinstitute){
    jsonArr.push({ key: "instituteName", value: nameOfinstitute });
  }

  if(jsonArr.length){
    obj.jsonArr = jsonArr;
  } 
  this._MastersService.fetchInstituteMasterList(obj).subscribe((res: any) => {
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
        this.element_data.push(getInstituteMasterObject(element))
        this.id=this.element_data[0].id;   
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
  
  let {nameOfinstitute} = this;

  //  if(nameOfinstitute=='' ){
  //   this.getDetails(null);
  //  }
  //  else{
    this.searchDetails(null,nameOfinstitute);
  //  }
  
}


onEdit(element:any) {
  this._MastersService.setId(element.id);
 this._MastersService.setRowData('update'); 
 this._MastersService.setDPData(element.nameOfinstitute);
  this.router.navigate(['dashboard/dmo/institute-master-listing/add']);
}

onView(element:any) {
  this._MastersService.setRowData('view');
  this._MastersService.setDPData(element.nameOfinstitute);
  this.router.navigate(['dashboard/dmo/institute-master-listing/add']);
}

onAdd(){
  this.router.navigate(['dashboard/dmo/institute-master-listing/add']);
}
  
}
