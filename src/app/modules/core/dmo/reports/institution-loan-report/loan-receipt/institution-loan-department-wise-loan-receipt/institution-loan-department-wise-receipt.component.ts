import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
//import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
//import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';
interface NameOfDepartment {
  value: string;
  viewValue: string;
}
interface LoanAmount {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-institution-loan-department-wise-receipt',
  templateUrl: './institution-loan-department-wise-receipt.component.html',
  styleUrls: ['./institution-loan-department-wise-receipt.component.css']
})
export class InstitutionLoanDepartmentWiseReceiptComponent implements OnInit {

  InstitutionLoanDepartmentWiseReceiptForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();


 
  
  Element_Data: any[] = [
    {
      srno: '28',
      AccountNo: '4646544',   
      NameOfInstitute: 'Agriculture Department',
      loanStartDate: '11-Dec-2018',
      loanTenure: '11',
      loanamount: '1000000.00',
      interestrate: '9.50',
    },
    {
      srno: '28',
      AccountNo: '4646544',   
      NameOfInstitute: 'Agriculture Department',
      loanStartDate: '11-Dec-2018',
      loanTenure: '11',
      loanamount: '1000000.00',
      interestrate: '9.50',
    },
    {
      srno: '28',
      AccountNo: '4646544',   
      NameOfInstitute: 'Agriculture Department',
      loanStartDate: '11-Dec-2018',
      loanTenure: '11',
      loanamount: '1000000.00',
      interestrate: '9.50',
    },
    {
      srno: '28',
      AccountNo: '4646544',   
      NameOfInstitute: 'Agriculture Department',
      loanStartDate: '11-Dec-2018',
      loanTenure: '11',
      loanamount: '1000000.00',
      interestrate: '9.50',
    },

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'srno',
    'AccountNo',
    'NameOfInstitute',
    'loanStartDate',
    'loanTenure',
    'loanamount',
    'interestrate',
  ];

   totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    ) { }

  ngOnInit() {
    this.InstitutionLoanDepartmentWiseReceiptForm = this.fb.group({
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
