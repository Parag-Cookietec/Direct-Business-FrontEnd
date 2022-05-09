import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { GoiLoanPurposeMaster } from 'src/app/models/dmo/dmo';
import { NgModule } from '@angular/core';
import { MastersService } from '../services/masters.service';
import { getGoiLoanPurposeMasterObject } from '../model/masters.data-model';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
  selector: 'app-goi-loan-purpose-master-listing',
  templateUrl: './goi-loan-purpose-master-listing.component.html',
  styleUrls: ['./goi-loan-purpose-master-listing.component.css']
})
export class GoiLoanPurposeMasterListingComponent implements OnInit {

 
  // Table data for Market Loan Received Table
  public element_data: GoiLoanPurposeMaster[] = [];

  // Table Columns for Market Loan Received Table
  displayedColumns: any[] = [
    'position',
    'loanPurpose',
    'planSchemeName',
    'action'
  ];

  showTable = false;
  goiLoanPurposeMasterListingForm: FormGroup;
  todayDate = Date.now();
  dataSource;
  loanPurpose="";
  planSchemeName="";
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
    this.goiLoanPurposeMasterListingForm = this.fb.group({
      loanPurpose: [''],
      planSchemeName: [''],
    });
    this.searchDetails();
  }

  // getDetails(reqObj) {
  //   let obj = reqObj ? reqObj : {
  //     "pageIndex": 0,
  //     "pageElement": 20,
  //     "jsonArr": []
  //   };
  //   this._MastersService.fetchGoiLoanPurposeMasterList(obj).subscribe((res: any) => {
  //     if (res && res.result && res.status === 200) {
  //       this.element_data = [];
  //       const data = res && res.result ? res.result : null;
  //       const {size, totalElement, result, totalPage} = data;
  //       this.totalRecords = totalElement;
  //       this.pageSize = size;
  //       result.forEach(element => {
  //         this.element_data.push(getGoiLoanPurposeMasterObject(element))
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
    this.searchDetails(this.pageIndex,this.goiLoanPurposeMasterListingForm.value.loanPurpose,this.goiLoanPurposeMasterListingForm.value.planSchemeName);
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
  this.goiLoanPurposeMasterListingForm.reset();
}



searchDetails(offset=null,loanPurpose=null,planSchemeName=null) {
  
  console.log(loanPurpose);
  let obj = {
    "pageIndex":offset ? offset : this.pageIndex,
    "pageElement": 10,
    "jsonArr": []
  };

  const jsonArr = [];
  if(loanPurpose){
    jsonArr.push({ key: "loanPurpose", value: loanPurpose });
  }

  if(planSchemeName){
    jsonArr.push({ key: "planSchemeName", value: planSchemeName });
  }

  if(jsonArr.length){
    obj.jsonArr = jsonArr;
  } 
  this._MastersService.fetchGoiLoanPurposeMasterList(obj).subscribe((res: any) => {
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
        this.element_data.push(getGoiLoanPurposeMasterObject(element))
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
  
  let {loanPurpose,planSchemeName} = this;

  //  if(loanPurpose=='' && planSchemeName==''){
  //   this.getDetails(null);
  //  }
  //  else{
    this.searchDetails(null,loanPurpose,planSchemeName);
  //  }
  
}


onEdit(element:any) {
  this._MastersService.setId(element.id);
  this._MastersService.setRowData('update');
  console.log(element); 
  this._MastersService.setDPData(element);
  this.router.navigate(['dashboard/dmo/goi-loan-purpose-master-listing/add']);
}

onView(element:any) {
  this._MastersService.setRowData('view');
  this._MastersService.setDPData(element);
  this.router.navigate(['dashboard/dmo/goi-loan-purpose-master-listing/add']);
}
  
onAdd(){
  this._MastersService.setRowData('add');
  this._MastersService.setDPData(null);
  this.router.navigate(['dashboard/dmo/goi-loan-purpose-master-listing/add']);
}

}
