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
  selector: 'app-grf-statement',
  templateUrl: './grf-statement.component.html',
  styleUrls: ['./grf-statement.component.css']
})
export class GRfStatementComponent implements OnInit {

  GRfStatementForm: FormGroup;
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

   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    ,private crfgrfReportsService : CrfgrfReportsService
    , private dataService: DataService
    , private _nssfLoanService: NssfLoanService) { }

  ngOnInit() {
    this.GRfStatementForm = this.fb.group({
      loanNo: [''],
      fromDate: [''],
      toDate: [''],
      ammountIn:['']
    });
 
    this.getgrfstatement();
  }

  getgrfstatement(offset = null){ 
    const payload = {
      "fromDate":this.crfgrfReportsService.formatDate(this.GRfStatementForm.value.fromDate),
      "toDate":this.crfgrfReportsService.formatDate(this.GRfStatementForm.value.toDate),
      "financialYear":"",
      "investFromId":"ALL",
      "accountTypeId":"1957",
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

 
  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;            
    this.getgrfstatement(this.pageIndex);
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
