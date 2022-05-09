import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';
interface RateOfInterest {
  value: string;
  viewValue: string;
}
interface LoanAmount {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-market-loan-interest-rate',
  templateUrl: './market-loan-interest-rate.component.html',
  styleUrls: ['./market-loan-interest-rate.component.css']
})
export class MarketLoanInterestRateComponent implements OnInit {

  MarketLoanInterestRateForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();


  RateOfInterests: RateOfInterest[] = [
    {value: 'lessthan-0', viewValue: 'Less Than'},
    {value: 'greaterthan-1', viewValue: 'Greater Than'},
    {value: 'equalto-2', viewValue: 'Equal To'},
    {value: 'between-3', viewValue: 'Between'}
  ];

  LoanAmounts: LoanAmount[] = [
    {value: '100k-0', viewValue: '100K-500K'},
    {value: '500k-1', viewValue: '500k+'}
  ];

  Element_Data: any[] = [
    {
      srno: '1',
      loanDescription: '2002-03/02',
      loanReceiptDate: '11-Dec-2018',
      loanAmount: '4,82,25,000.00',
      paidPrincipal: '24,11,25,000.00',
      interest: '25,31,42,00.00',
      principal: '49,35,06,000.00',
      repaymentOutstanding: '49,35,06,000.00',
    },
    {
      srno: '1',
      loanDescription: '2002-03/02',
      loanReceiptDate: '11-Dec-2018',
      loanAmount: '4,82,25,000.00',
      paidPrincipal: '24,11,25,000.00',
      interest: '25,31,42,00.00',
      principal: '49,35,06,000.00',
      repaymentOutstanding: '49,35,06,000.00',
    },
   

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'loanDescription',
    'loanReceiptDate',
    'loanAmount',
    'paidPrincipal',
    'interest',
    'principal',
    'repaymentOutstanding',
  ];

  totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    , private _nssfLoanService: NssfLoanService) { }

  ngOnInit() {
    this.MarketLoanInterestRateForm = this.fb.group({     
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
