import { CommonDirective } from 'src/app/common/directive/validation.directive';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NssfLoanApproved } from '../../../model/dmo';
import { DataService } from 'src/app/common/data.service';
import { NssfLoanService } from '../../../services/nssf-loan.service';
import * as moment from 'moment';

interface FinancialYear {
  value: string;
  viewValue: string;
}
interface OrganizationType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-guarantee-register-organization-wise',
  templateUrl: './guarantee-register-organization-wise.component.html',
  styleUrls: ['./guarantee-register-organization-wise.component.css']
})
export class GuaranteeRegisterOrganizationWiseComponent implements OnInit {

  GuaranteeRegisterOrganizationWiseForm: FormGroup;
  maxDate = new Date();
  todayDate = Date.now();
  directiveObj = new CommonDirective();


  FinancialYears: FinancialYear[] = [
    {value: '1', viewValue: '1998-1999'},
    {value: '2', viewValue: '1999-2000'},
    {value: '2', viewValue: '2000-2001'}
  ];

  OrganizationTypes: OrganizationType[] = [
    {value: '1', viewValue: 'Co-Operation Bank'},
    {value: '2', viewValue: 'Joint Stock'}
  ];

  Element_Data: any[] = [
    {
      Description: 'New Guarentee',
      Amount: '4,90,00,000.00',
    },
    {
      Description: 'New Guarentee',
      Amount: '00.00',
    },

  ];


 
  dataSource = new MatTableDataSource<any>(this.Element_Data);

  displayedColumns: any[] = [
    'Description',
    'Amount'
  ];

  totalRecords: number = 10;
  pageSize:number = 10;
  pageIndex: number = 0;

  constructor(private fb: FormBuilder
    , private router: Router
    , private dataService: DataService
    , private _nssfLoanService: NssfLoanService) { }

  ngOnInit() {
    this.GuaranteeRegisterOrganizationWiseForm = this.fb.group({     
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
