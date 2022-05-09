import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../../services/nssf-loan.service';
import * as moment from 'moment';

@Component({
  selector: 'app-Amount-Wise',
  templateUrl: './Amount-Wise.component.html',
  styleUrls: ['./Amount-Wise.component.css']
})
export class AmountWiseComponent implements OnInit {

  AmountWiseForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();

  

  Element_Data: any[] = [
    {
      srno: '28',
      accountNo: 'SC-62',
      purpose: 'NAC',
      tenure: '11',
      moratorium: '5',
      interest: '5%',
      paymentDate: '06/06/2005',
      loanAmount: '100000.00',
      paidAmount: '10000.00',
    },
    {
      srno: '28',
      accountNo: 'SC-62',
      purpose: 'NAC',
      tenure: '11',
      moratorium: '5',
      interest: '5%',
      paymentDate: '06/06/2005',
      loanAmount: '100000.00',
      paidAmount: '10000.00',
    },
    {
      srno: '28',
      accountNo: 'SC-62',
      purpose: 'NAC',
      tenure: '11',
      moratorium: '5',
      interest: '5%',
      paymentDate: '06/06/2005',
      loanAmount: '100000.00',
      paidAmount: '10000.00',
    },
    {
      srno: '28',
      accountNo: 'SC-62',
      purpose: 'NAC',
      tenure: '11',
      moratorium: '5',
      interest: '5%',
      paymentDate: '06/06/2005',
      loanAmount: '100000.00',
      paidAmount: '10000.00',
    },

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'accountNo',
    'purpose',
    'tenure',
    'moratorium',
    'interest',
    'paymentDate',
    'loanAmount',
    'paidAmount',
  ];

   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    , private _nssfLoanService: NssfLoanService) { }

  ngOnInit() {
    this.AmountWiseForm = this.fb.group({
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
