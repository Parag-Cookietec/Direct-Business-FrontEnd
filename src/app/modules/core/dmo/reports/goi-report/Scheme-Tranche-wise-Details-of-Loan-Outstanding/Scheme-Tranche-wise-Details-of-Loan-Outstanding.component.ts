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
  selector: 'app-Scheme-Tranche-wise-Details-of-Loan-Outstanding',
  templateUrl: './Scheme-Tranche-wise-Details-of-Loan-Outstanding.component.html',
  styleUrls: ['./Scheme-Tranche-wise-Details-of-Loan-Outstanding.component.css']
})
export class SchemeTranchewiseDetailsofLoanOutstandingComponent implements OnInit {

  SchemeTranchewiseDetailsofLoanOutstandingForm: FormGroup;
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

  NameOfSchemes: NameOfScheme[] = [
    {value: 'RIDF-0', viewValue: 'RIDF'},
    {value: 'LTO-1', viewValue: 'LTO'},
    {value: 'SBIOBC-1', viewValue: 'SBI-OBC'}
  ];

  Tranches: Tranche[] = [
    {value: 'IV-0 ', viewValue: 'IV'},
    {value: 'X-1', viewValue: 'X'}
  ];

  NameOfInstitutes: NameOfInstitute[] = [
    {value: 'NABARD-0', viewValue: 'NABARD'},
    {value: 'SBI-1', viewValue: 'SBI'},
    {value: 'OBC-1', viewValue: 'OBC'}
  ];

  NameOfDepartments: NameOfDepartment[] = [
    {value: 'NarmadaWatersupply-0', viewValue: 'Narmada Water Supply'},
    {value: 'NarmadaWatersupply-1', viewValue: 'Narmada Water Supply'},
    {value: 'NarmadaWatersupply-1', viewValue: 'Narmada Water Supply'}
  ];

  RateOfIntrests: RateOfIntrest[] = [
    {value: 'lessthan-0', viewValue: 'Less Than'},
    {value: 'equal-1', viewValue: 'Equal'},
    {value: 'between-1', viewValue: 'Between'}
  ];

  LoanAmounts: LoanAmount[] = [
    {value: 'lessthan-0', viewValue: 'Less Than'},
    {value: 'equal-1', viewValue: 'Equal'},
    {value: 'between-1', viewValue: 'Between'}
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
    this.SchemeTranchewiseDetailsofLoanOutstandingForm = this.fb.group({
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
