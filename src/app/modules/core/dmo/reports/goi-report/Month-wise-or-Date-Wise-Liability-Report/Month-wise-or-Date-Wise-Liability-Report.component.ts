import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';

interface SelectInputType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-Month-wise-or-Date-Wise-Liability-Report',
  templateUrl: './Month-wise-or-Date-Wise-Liability-Report.component.html',
  styleUrls: ['./Month-wise-or-Date-Wise-Liability-Report.component.css']
})
export class MonthwiseorDateWiseLiabilityReportComponent implements OnInit {

  goiMonthwiseorDateWiseLiabilityReport: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();

  SelectInputTypes: SelectInputType[] = [
    {value: 'Datewise-0', viewValue: 'Date Wise'},
    {value: 'Yearwise-1', viewValue: 'Year Wise'}
  ];

  Element_Data: any[] = [
    {
      srno: '28',
      ministryNameOrScheme: 'Ministry of Finance, Department of Expenditure(Block Loan- back to Back)',
      paymentDate: '11-Dec-2018',
      loanAmount: '1000000.00',
      principal: '11',
      interest: '5',
      total: '1000000.00',
    },
    {
      srno: '28',
      ministryNameOrScheme: 'Ministry of Finance, Department of Expenditure(Block Loan- back to Back)',
      paymentDate: '11-Dec-2018',
      loanAmount: '1000000.00',
      principal: '11',
      interest: '5',
      total: '1000000.00',
    },
    {
      srno: '28',
      ministryNameOrScheme: 'Ministry of Finance, Department of Expenditure(Block Loan- back to Back)',
      paymentDate: '11-Dec-2018',
      loanAmount: '1000000.00',
      principal: '11',
      interest: '5',
      total: '1000000.00',
    },
    {
      srno: '28',
      ministryNameOrScheme: 'Ministry of Finance, Department of Expenditure(Block Loan- back to Back)',
      paymentDate: '11-Dec-2018',
      loanAmount: '1000000.00',
      principal: '11',
      interest: '5',
      total: '1000000.00',
    },

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'ministryNameOrScheme',
    'paymentDate',
    'loanAmount',
    'principal',
    'interest',
    'total',
  ];

   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    , private _nssfLoanService: NssfLoanService) { }

  ngOnInit() {
    this.goiMonthwiseorDateWiseLiabilityReport = this.fb.group({
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
