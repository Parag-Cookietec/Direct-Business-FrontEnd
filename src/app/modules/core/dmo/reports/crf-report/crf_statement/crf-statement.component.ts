import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';
import { CrfgrfReportsService } from '../../reports-services/crfgrf-reports.service';

interface RateOfInterest {
  value: string;
  viewValue: string;
}
interface LoanAmount {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crf-statement',
  templateUrl: './crf-statement.component.html',
  styleUrls: ['./crf-statement.component.css']
})
export class CRfStatementComponent implements OnInit {

  totalRecords: number = 0;
  pageSize:number = 10;
  pageIndex: number = 0;

  CRfStatementForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();
  dataSource;  
  displayedColumns: any[] = [
    'srno',
    'saleDate',
    'currAccBal',
    'interestEarned',
    'scurityTypeId',
    'currFaceVal',
    'salePrice',
    'costValue',
    'brokenDays',
    'brokenPeriodInterest',
    'stAccTrfrAmt',
    'progBalAcc',
  ];
  

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    ,private crfgrfReportsService : CrfgrfReportsService
    , private _nssfLoanService: NssfLoanService) { }

  ngOnInit() {
    this.CRfStatementForm = this.fb.group({
      loanNo: [''],
      fromDate: [''],
      toDate: [''],
      ammountIn:['']
    });
    
    this.getcrfstatement();
   
  }

  getcrfstatement(offset = null){ 
    const payload = {
      "fromDate":this.crfgrfReportsService.formatDate(this.CRfStatementForm.value.fromDate),
      "toDate":this.crfgrfReportsService.formatDate(this.CRfStatementForm.value.toDate),
      "financialYear":"",
      "investFromId":"ALL",
      "accountTypeId":"1958",
      "pageIndex":offset ? offset : this.pageIndex,
      "pageSize":this.pageSize
  }
   
    this.crfgrfReportsService.grfcrfstatementreport(payload).subscribe((response:any) => {
      console.log(response)
      this.dataSource = new MatTableDataSource<any>(response?.result?.result);
      this.totalRecords = response?.result?.totalElement
    }, error => {
      console.log(error);
    })
  }

 
  reset(){
    this.CRfStatementForm.reset();
  }
  
  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;            
    this.getcrfstatement(this.pageIndex);

    // this.pageSize = event.pageSize;
    // this.pageIndex = event.pageIndex;
    // const dpObj = {
    //   "pageIndex": event.pageIndex,
    //   "pageElement": event.pageSize,
    //   "jsonArr": []
    // };
    // let reqObj = {
    //   "pageIndex": 0,
    //   "pageElement": 10,
    //   "jsonArr": []
    // };
  }

/*   onSubmit() { }

  onApprove(obj) {
    this._nssfLoanService.setLoanId(obj.id);
    this.router.navigate(['/dashboard/dmo/nssf-loan-approved/approve']);
  }

  onEdit(id) {
    this.dataService.setOption('fromApproved', 'editMode');
    this.router.navigate([`/dashboard/dmo/nssf-loan-received/add-details/${id}`]);
  }

  onView(id) {
    this.dataService.setOption('fromApproved', 'viewMode');
    this.router.navigate([`/dashboard/dmo/nssf-loan-received/add-details/${id}`]);

  } */
}
