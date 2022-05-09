import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';



import { AdviceMasterListing } from 'src/app/models/dmo/dmo';
import { NgModule } from '@angular/core';
import { MastersService } from '../services/masters.service';
import { getAdviceMasterListObject } from '../model/masters.data-model';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
  selector: 'app-advice-master-listing',
  templateUrl: './advice-master-listing.component.html',
  styleUrls: ['./advice-master-listing.component.css']
})
export class AdviceMasterListingComponent implements OnInit {

  
  // Table data for Market Loan Received Table
  public element_data: AdviceMasterListing[] = [];

  // Table Columns for Market Loan Received Table
  displayedColumns: any[] = [
    'position',
    'adviceCode',
    'adviceBy',
    'action'
  ];

  showTable = false;
  adviceMasterListingForm: FormGroup;
  todayDate = Date.now();
  dataSource;
  adviceCode="";
  adviceBy="";
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
    this.adviceMasterListingForm = this.fb.group({
      adviceCode: [''],
      adviceBy: [''],
    });    
      this.searchDetails();
  }

  // getDetails(reqObj) {
  //   let obj =  {
  //     "pageIndex": reqObj ? reqObj : this.pageIndex,
  //     "pageElement": this.pageSize,
  //     "jsonArr": []
  //   };
  //   this._MastersService.fetchAdvicemasterList(obj).subscribe((res: any) => {
  //     if (res && res.result && res.status === 200) {
  //       this.element_data = [];
  //       const data = res && res.result ? res.result : null;
  //       const {size, totalElement, result, totalPage} = data;        
  //       this.totalRecords = res.result.totalElement;
  //       // this.pageSize = data.totalPage;
  //       result.forEach(element => {
  //         this.element_data.push(getAdviceMasterListObject(element))
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
    this.searchDetails(this.pageIndex,this.adviceMasterListingForm.value.adviceCode,this.adviceMasterListingForm.value.adviceBy);
    
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
  this.adviceMasterListingForm.reset();
  this.searchDetails();
}



searchDetails(offset = null,adviceCode = null,adviceBy = null) {  
  let obj = {    
    "pageIndex":offset ? offset : this.pageIndex,
    "pageElement":this.pageSize,
    "jsonArr": []
  };
  const jsonArr = [];
  if(adviceCode){
    jsonArr.push({ key: "adviceAgencyCd", value: adviceCode });
  }

  if(adviceBy){
    jsonArr.push({ key: "adviceAgencyBy", value: adviceBy });
  }

  if(jsonArr.length){
    obj.jsonArr = jsonArr;
  }  

  this._MastersService.fetchAdvicemasterList(obj).subscribe((res: any) => {
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
        this.element_data.push(getAdviceMasterListObject(element))
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
  let {adviceCode,adviceBy} = this;

  //  if(adviceCode=='' && adviceBy==''){
  //   this.getDetails(null);
  //  }
  //  else{
    this.searchDetails(null,adviceCode,adviceBy);
  //  }
  
}


onEdit(element:any) {
  this._MastersService.setId(element.id);
  this._MastersService.setRowData('update');
  console.log(element); 
  this._MastersService.setDPData(element);
  this.router.navigate(['dashboard/dmo/advice-master/add']);
}

onView(element:any) {
  this._MastersService.setRowData('view');
  this._MastersService.setDPData(element);
  this.router.navigate(['dashboard/dmo/advice-master/add']);
}

onAddAdviceMaster() {
  this._MastersService.setRowData('add');
  this._MastersService.setDPData(null);
  this.router.navigate(['dashboard/dmo/advice-master/add']);
}
  addDetails(dpObj) {
    this._MastersService.setDPData(dpObj);
    this.router.navigate(['dashboard/dmo/advice-master/add']);
  }

}
