import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
//import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
//import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dept-wise-outstanding-vs-paid',
  templateUrl: './dept-wise-outstanding-vs-paid.component.html',
  styleUrls: ['./dept-wise-outstanding-vs-paid.component.css']
})
export class DeptWiseOutstandingVsPaid implements OnInit {

  DeptWiseOutstandindVsPaidForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();


  

  Element_Data: any[] = [
    {
      srno: '1',
      AccountNo: '2002-03/02',
      Tranche: 'ABC',
      loanAmount: '4,82,25,000.00',
      principal: '24,11,25,000.00',
      interest: '25,31,42,00.00',
      outstandingLoan: '49,35,06,000.00',
      loanOutstanding: '49,35,06,000.00',
      },
    {
      srno: '1',
      AccountNo: '2002-03/02',
      Tranche: 'ABC',
      loanAmount: '4,82,25,000.00',
      principal: '24,11,25,000.00',
      interest: '25,31,42,00.00',
      outstandingLoan: '49,35,06,000.00',
      loanOutstanding: '49,35,06,000.00',
    },
    {
      srno: '1',
      AccountNo: '2002-03/02',
      Tranche: 'ABC',
      loanAmount: '4,82,25,000.00',
      principal: '24,11,25,000.00',
      interest: '25,31,42,00.00',
      outstandingLoan: '49,35,06,000.00',
      loanOutstanding: '49,35,06,000.00',
    },
    {
      srno: '1',
      AccountNo: '2002-03/02',
      Tranche: 'ABC',
      loanAmount: '4,82,25,000.00',
      principal: '24,11,25,000.00',
      interest: '25,31,42,00.00',
      outstandingLoan: '49,35,06,000.00',
      loanOutstanding: '49,35,06,000.00',
    },

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'AccountNo',
    'Tranche',
    'loanAmount',
    'principal',
    'interest',
    'outstandingLoan',
    'loanOutstanding',
  ];

   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    ) { }

  ngOnInit() {
    this.DeptWiseOutstandindVsPaidForm = this.fb.group({     
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
