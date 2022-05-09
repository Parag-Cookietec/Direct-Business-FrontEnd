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
  selector: 'app-memo-no-wise-details',
  templateUrl: './memo-no-wise-details.component.html',
  styleUrls: ['./memo-no-wise-details.component.css']
})
export class MemoNoWiseDetail implements OnInit {

  MemoNoWiseDetailForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();


  

  Element_Data: any[] = [
    {
      srno: '1',
      Tranche: 'ABC',
      AccountNo: '2002-03/02',
      loanOutstandingLoan: '49,35,06,000.00',
      interestRate: '2.00',
      fromDateDate: '11-Dec-2018',
      toDate: '11-Dec-2018',
      noDays: '4',
      interest: '2,411',
      adjustment: '2,411',
      interestPayable: '2,411',
      },
    {
      srno: '1',
      Tranche: 'ABC',
      AccountNo: '2002-03/02',
      loanOutstandingLoan: '49,35,06,000.00',
      interestRate: '2.00',
      fromDateDate: '11-Dec-2018',
      toDate: '11-Dec-2018',
      noDays: '4',
      interest: '2,411',
      adjustment: '2,411',
      interestPayable: '2,411',
    },
    {
      srno: '1',
      Tranche: 'ABC',
      AccountNo: '2002-03/02',
      loanOutstandingLoan: '49,35,06,000.00',
      interestRate: '2.00',
      fromDateDate: '11-Dec-2018',
      toDate: '11-Dec-2018',
      noDays: '4',
      interest: '2,411',
      adjustment: '2,411',
      interestPayable: '2,411',
    },
    {
      srno: '1',
      Tranche: 'ABC',
      AccountNo: '2002-03/02',
      loanOutstandingLoan: '49,35,06,000.00',
      interestRate: '2.00',
      fromDateDate: '11-Dec-2018',
      toDate: '11-Dec-2018',
      noDays: '4',
      interest: '2,411',
      adjustment: '2,411',
      interestPayable: '2,411',
    },

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'Tranche',
    'AccountNo',
    'loanOutstandingLoan',
    'interestRate',
    'fromDateDate',
    'toDate',
    'noDays',
    'interest',
    'adjustment',
    'interestPayable',
  ];

   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    ) { }

  ngOnInit() {
    this.MemoNoWiseDetailForm = this.fb.group({     
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
