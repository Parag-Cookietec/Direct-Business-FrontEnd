import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../../services/nssf-loan.service';
import * as moment from 'moment';
interface FromYear {
  value: string;
  viewValue: string;
}
interface ToYear {
  value: string;
  viewValue: string;
}
interface NameOfScheme {
  value: string;
  viewValue: string;
}
interface Tranche {
  value: string;
  viewValue: string;
}
interface NameOfInstitute {
  value: string;
  viewValue: string;
}

interface NameOfDepartment {
  value: string;
  viewValue: string;
}
interface RateOfIntrest {
  value: string;
  viewValue: string;
}

interface LoanAmount {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-Tranche-Wise',
  templateUrl: './Tranche-Wise.component.html',
  styleUrls: ['./Tranche-Wise.component.css']
})
export class TrancheWiseComponent implements OnInit {

  TrancheWiseForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();

  

  Element_Data: any[] = [
    {
      srno: '28',
      month: 'Apr-2005',
      openingBalance: '11-Dec-2018',
      newLoansReceived: '11',
      loanRepaid: '5',
      closingBalance: '1000000.00',
      weightedAvgIntrestRate: '9.50',
    },
    {
      srno: '28',
      month: 'Apr-2005',
      openingBalance: '11-Dec-2018',
      newLoansReceived: '11',
      loanRepaid: '5',
      closingBalance: '1000000.00',
      weightedAvgIntrestRate: '9.50',
    },
    {
      srno: '28',
      month: 'Apr-2005',
      openingBalance: '11-Dec-2018',
      newLoansReceived: '11',
      loanRepaid: '5',
      closingBalance: '1000000.00',
      weightedAvgIntrestRate: '9.50',
    },
    {
      srno: '28',
      month: 'Apr-2005',
      openingBalance: '11-Dec-2018',
      newLoansReceived: '11',
      loanRepaid: '5',
      closingBalance: '1000000.00',
      weightedAvgIntrestRate: '9.50',
    },

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'month',
    'openingBalance',
    'newLoansReceived',
    'loanRepaid',
    'closingBalance',
    'weightedAvgIntrestRate',
  ];

   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    , private _nssfLoanService: NssfLoanService) { }

  ngOnInit() {
    this.TrancheWiseForm = this.fb.group({
      loanNo: [''],
      fromDate: [''],
      toDate: [''],
    });
 
  
  }

 
  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const dpObj = {
      "pageIndex": event.pageIndex,
      "pageElement": event.pageSize,
      "jsonArr": []
    };
    let reqObj = {
      "pageIndex": 0,
      "pageElement": 10,
      "jsonArr": []
    };
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
