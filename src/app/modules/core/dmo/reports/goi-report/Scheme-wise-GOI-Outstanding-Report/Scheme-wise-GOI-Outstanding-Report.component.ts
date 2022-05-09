import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';
interface FromYear {
  value: string;
  viewValue: string;
}
interface ToYear {
  value: string;
  viewValue: string;
}
interface MinistryName {
  value: string;
  viewValue: string;
}
interface LoanPurpose {
  value: string;
  viewValue: string;
}
interface NameOfPlanScheme {
  value: string;
  viewValue: string;
}
interface RateOfInterest {
  value: string;
  viewValue: string;
}
interface LoanAmount {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-Scheme-wise-GOI-Outstanding-Report',
  templateUrl: './Scheme-wise-GOI-Outstanding-Report.component.html',
  styleUrls: ['./Scheme-wise-GOI-Outstanding-Report.component.css']
})
export class SchemewiseGOIOutstandingReportComponent implements OnInit {

  SchemewiseGOIOutstandingReportForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();

  FromYears: FromYear[] = [
    {value: '2000-2001-0', viewValue: '2000-2001'},
    {value: '2001-2002-1', viewValue: '2001-2002'},
    {value: '2002-2003-2', viewValue: '2002-2003'},
    {value: '2003-2004-3', viewValue: '2003-2004'}
  ];

  ToYears: ToYear[] = [
    {value: '2000-2001-0', viewValue: '2000-2001'},
    {value: '2001-2002-1', viewValue: '2001-2002'},
    {value: '2002-2003-2', viewValue: '2002-2003'},
    {value: '2003-2004-3', viewValue: '2003-2004'}
  ];

  MinistryNames: MinistryName[] = [
    {value: 'Ministryofhomeaffairs-0 ', viewValue: 'Ministry of home affairs'},
    {value: 'MinistryofLoan-1', viewValue: 'Ministry of Loan'}
  ];

  LoanPurposes: LoanPurpose[] = [
    {value: 'PersonalLoan-0', viewValue: 'Personal Loan'},
    {value: 'BlockLoan-1', viewValue: 'Block Loan'},
    {value: 'StatePlanLoans-1', viewValue: 'State Plan Loans'}
  ];

  NameOfPlanSchemes: NameOfPlanScheme[] = [
    {value: 'PersonalLoan-0', viewValue: 'Personal Loan'},
    {value: 'BlockLoan-1', viewValue: 'Block Loan'},
    {value: 'StatePlanLoans-1', viewValue: 'State Plan Loans'}
  ];

  RateOfInterests: RateOfInterest[] = [
    {value: 'PersonalLoan-0', viewValue: 'Personal Loan'},
    {value: 'BlockLoan-1', viewValue: 'Block Loan'},
    {value: 'StatePlanLoans-1', viewValue: 'State Plan Loans'}
  ];
  LoanAmounts: LoanAmount[] = [
    {value: 'PersonalLoan-0', viewValue: 'Personal Loan'},
    {value: 'BlockLoan-1', viewValue: 'Block Loan'},
    {value: 'StatePlanLoans-1', viewValue: 'State Plan Loans'}
  ];

  Element_Data: any[] = [
    {
      srno: '28',
      financialYear: 'Minor Irrigation Soil Conservation',
      schemeName: 'DOAC/00-01/01(12/05/2000)',
      openingBalance: '11-Dec-2018',
      newLoansReceived: '11',
      loanRepaid: '5',
      closingBalance: '1000000.00',
      weightedAvgIntrestRate: '9.50',
    },
    {
      srno: '28',
      financialYear: 'Minor Irrigation Soil Conservation',
      schemeName: 'DOAC/00-01/01(12/05/2000)',
      openingBalance: '11-Dec-2018',
      newLoansReceived: '11',
      loanRepaid: '5',
      closingBalance: '1000000.00',
      weightedAvgIntrestRate: '9.50',
    },
    {
      srno: '28',
      financialYear: 'Minor Irrigation Soil Conservation',
      schemeName: 'DOAC/00-01/01(12/05/2000)',
      openingBalance: '11-Dec-2018',
      newLoansReceived: '11',
      loanRepaid: '5',
      closingBalance: '1000000.00',
      weightedAvgIntrestRate: '9.50',
    },
    {
      srno: '28',
      financialYear: 'Minor Irrigation Soil Conservation',
      schemeName: 'DOAC/00-01/01(12/05/2000)',
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
    'financialYear',
    'schemeName',
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
    this.SchemewiseGOIOutstandingReportForm = this.fb.group({
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
